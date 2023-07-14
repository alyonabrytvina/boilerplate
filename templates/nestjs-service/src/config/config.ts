import type { Config } from './config.interface';

const config: Config = {
    swagger: {
        enabled: true,
        title: 'NestJS',
        description: 'The nestjs API description',
        version: '1.0',
        path: 'api',
    }
};

export default (): Config => config;
