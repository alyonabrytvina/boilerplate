import * as fs from 'fs/promises';
import * as path from 'path';
import { exec } from 'child_process';

export async function removeLockFileIfExists(
    fileName: string,
    directoryPath: string,
): Promise<boolean> {
    try {
        await fs.unlink(path.join(directoryPath, fileName));
        return true;
    } catch (error) {
        return false;
    }
}

export async function fileExists(path: string): Promise<boolean> {
    try {
        await fs.stat(path);
        return true;
    } catch (error) {
        return false;
    }
}

export async function initGitRepo(
    path: string,
    packageManager: string,
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        exec(`cd ${path} && git init && ${packageManager} install`, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(undefined);
            }
        });
    });
}

export function getRepoPath(kit): string {
    return `alyonabrytvina/boilerplate/templates/${kit}`;
}
