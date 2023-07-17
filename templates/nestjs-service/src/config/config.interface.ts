export interface Config {
    swagger: SwaggerConfig;
}

export interface SwaggerConfig {
    enabled: boolean;
    title: string;
    description: string;
    version: string;
    path: string;
}
