import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig } from './config/config.interface';

export const setupSwagger = (app: INestApplication): void => {
    const configService = app.get(ConfigService);
    const swaggerConfig = configService.get<SwaggerConfig>('swagger');

    if (swaggerConfig.enabled) {
        const config = new DocumentBuilder()
            .setTitle(swaggerConfig.title || 'Nestjs')
            .setDescription(swaggerConfig.description || 'The nestjs API description')
            .setVersion(swaggerConfig.version || '1.0')
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
    }
};
