import * as fs from 'fs/promises';
import * as chalk from 'chalk';
import * as path from 'path';
import * as degit from 'tiged';
import * as prompts from 'prompts';
import {
    fileExists,
    getRepoPath,
    initGitRepo,
    removeLockFileIfExists,
} from './utils';

const TEMPLATE_KITS_JSON_URL =
    'https://raw.githubusercontent.com/alyonabrytvina/boilerplate/master/template-kits.json';

export async function main() {
    console.log('Welcome to the cms-quick-start!');
    let templates = [];

    try {
        const res = await fetch(TEMPLATE_KITS_JSON_URL);

        if (res.ok) {
            const starterKitsJSON = await res.json();

            if (typeof starterKitsJSON === 'object' && starterKitsJSON) {
                templates = Object.entries(starterKitsJSON)
                    .map(([name, description]: [string, string]) => ({
                        value: name,
                        title: description,
                    }))
                    .sort((a, b) => a.title.localeCompare(b.title));
            }
        } else {
            throw new Error();
        }
    } catch (e) {
        console.error(chalk.red('Failed to get list of available starter kits'));
        process.exit(1);
    }

    const options = await prompts([
        {
            type: 'autocomplete',
            name: 'kit',
            message: `Which starter kit would you ❤️ to use?(${chalk.grey('Use arrow keys')})`,
            choices: templates,
            suggest: (input, choices) =>
                Promise.resolve(
                    choices.filter((c) =>
                        c.title.toLowerCase().includes(input.toLowerCase()),
                    ),
                ),
        },
        {
            type: 'text',
            name: 'name',
            message: 'What is the name of your project?',
        },
    ]);

    const packageOptions = await prompts([
        {
            type: 'autocomplete',
            name: 'packageManager',
            message: `Which package manager would you ❤️ to use?(${chalk.grey('Use arrow keys')})`,
            choices: ['npm', 'yarn'].map((pm) => ({
                title: pm,
                value: pm,
            })),
            suggest: (input, choices) =>
                Promise.resolve(choices.filter((c) => c.title.includes(input))),
        },
    ]);

    const [createSelectedKitResult] = await Promise.allSettled([
        createStarter(options, packageOptions),
    ]);

    if (createSelectedKitResult.status === 'rejected') {
        const err = createSelectedKitResult.reason;
        console.error(
            chalk.red(
                err instanceof Error ? err.message : `Creating starter kit failed`,
            ),
        );
        process.exit(1);
    }

    async function createStarter(
        options: prompts.Answers<'name' | 'kit'>,
        packageOptions: prompts.Answers<string>,
    ): Promise<void> {
        const repoPath = getRepoPath(options.kit);
        const destPath = path.join(process.cwd(), options.name);
        const {packageManager} = packageOptions;

        const emitter = degit(repoPath, {
            cache: false,
            force: true,
            verbose: false,
            mode: 'tar',
        });

        try {
            console.log(
                `${chalk.green(`>`)} ${chalk.gray(`▹▹▸▹▹ Installation in progress...`)}`,
            );
            await emitter.clone(destPath);
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw err;
            } else {
                throw new Error('Failed to download starter kit');
            }
        }

        try {
            const packageJsonPath = path.join(destPath, 'package.json');
            const packageJsonExists = await fileExists(packageJsonPath);

            if (packageJsonExists) {
                await initNodeProject(packageJsonPath, destPath, options);
            }

            const packageCommand = `https://raw.githubusercontent.com/alyonabrytvina/boilerplate/master/templates/${options.kit}/package.json`;
            const res = await fetch(packageCommand);

            if (res.ok) {
                await res.json();
            } else {
                throw new Error();
            }

            await initGitRepo(destPath, packageManager);

            console.log(chalk.bold(chalk.green('✔') + ' Done!'));
            console.log('\nNext steps:');
            console.log(` ${chalk.bold(chalk.cyan(`cd ${options.name}`))}`);

            if (packageJsonExists) {
                console.log(` ${chalk.bold(chalk.cyan(`${packageManager} run dev`))}
                              or
                              ${chalk.bold(
                    chalk.cyan(`${packageManager} run start`),
                )}`);
            }
        } catch (err: unknown) {
            throw new Error(
                'Failed to initialize the starter kit. This probably means that you provided an invalid kit name.',
            );
        }
    }

    async function initNodeProject(
        packageJsonPath: string,
        projectDestPath: string,
        options: prompts.Answers<'name' | 'kit'>,
    ) {
        const packageJSON = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
        packageJSON.name = options.name;
        packageJSON.version = '0.1.0';

        try {
            await fs.writeFile(
                path.join(projectDestPath, 'package.json'),
                JSON.stringify(packageJSON, null, 2),
            );
            await Promise.all([
                await removeLockFileIfExists('package-lock.json', projectDestPath),
                await removeLockFileIfExists('yarn.lock', projectDestPath),
            ]);
        } catch (error) {
            console.info(
                chalk.gray(
                    `> ${chalk.bold(
                        'Note:',
                    )} Failed to update package.json. You may need to do this manually.`,
                ),
            );
            throw error;
        }
    }
}
