import { NestFactory } from '@nestjs/core';
import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';
import { prompt } from 'inquirer';
import { AppModule } from './app.module';
import { setupSwagger } from './bootstrap/swagger.module';
import * as shell from 'shelljs';

export interface CliOptions {
    projectName: string;
    templateName: string;
    templatePath: string;
    targetPath: string;
}

interface Answers {
    template: string;
    name: string;
}

const API_DEFAULT_PORT = 3005;
const CURR_DIR = process.cwd();
let isUpdate = false;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    setupSwagger(app);

    await app.listen(process.env.APP_PORT || API_DEFAULT_PORT);

    const CHOICES = ['Eslint, Prettier, Jest, Swagger, Environment variables'];

    const QUESTIONS = [
        {
            name: 'template',
            type: 'list',
            message: 'Which starter kit would you like to use',
            choices: CHOICES,
        },
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of your project?',
        }
    ];

    prompt(QUESTIONS)
        .then((answers: Answers) => {
            const projectChoice = answers['template'];
            const projectName = answers['name'];
            const templatePath = path.join(__dirname, '../templates/base-setup');
            const targetPath = path.join(CURR_DIR, projectName);

            const options: CliOptions = {
                projectName,
                templateName: projectChoice,
                templatePath,
                targetPath
            };

            createProject(targetPath);
            createDirectoryContents(templatePath, projectName);
            postProcess(options);
        });


    function createProject(projectPath: string) {
        if (fs.existsSync(projectPath)) {
            console.log(chalk.yellowBright('Updating the project..'));
            isUpdate = true;
        } else if (!fs.existsSync(projectPath)) {
            console.log(chalk.greenBright('Creating the project..'));
            fs.mkdirSync(projectPath);
        }
    }

    const SKIP_FILES = ['node_modules', 'dist', 'src', 'bootstrap', 'config'];

    function createDirectoryContents(templatePath: string, projectName: string) {
        const filesToCreate = fs.readdirSync(templatePath);

        filesToCreate.forEach(file => {
            const origFilePath = path.join(templatePath, file);
            const stats = fs.statSync(origFilePath);

            if (SKIP_FILES.includes(file)) {
                return;
            }

            if (stats.isFile()) {
                const contents = fs.readFileSync(origFilePath, 'utf8');
                const writePath = path.join(CURR_DIR, projectName, file);

                fs.writeFileSync(writePath, contents, 'utf8');
            } else if (stats.isDirectory()) {

                if (!fs.existsSync(path.join(CURR_DIR, projectName, file))) {
                    fs.mkdirSync(path.join(CURR_DIR, projectName, file));
                }
                createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
            }
        });
    }

    function postProcess(options: CliOptions) {
        const isNode = fs.existsSync(path.join(options.templatePath, 'package.json'));

        if (isNode) {
            process.chdir(options.targetPath);

            try {
                shell.exec('npm install');
                // execSync('npm install', {stdio: 'inherit'});
            } catch (e) {
                console.log(chalk.redBright('Failed'));
                return false;
            }
        }

        console.log(chalk.greenBright(`Project successfully ${isUpdate ? 'updated' : 'created'}`));

        return true;
    }
}

bootstrap()
    .then(() => {
        // console.log(`Application is listening on port ${API_DEFAULT_PORT}`);
    })
    .catch((err) => {
        console.error(err);
    });
