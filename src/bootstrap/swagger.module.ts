import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const SWAGGER_TITLE = 'API Documentation';
const SWAGGER_DESCRIPTION = 'API description';
const SWAGGER_VERSION = '1.0';

export const setupSwagger = (app: INestApplication) => {
    const configService = app.get(ConfigService);

    if (configService.get<string>('NODE_ENV') !== 'prod') {
        const config = new DocumentBuilder()
            .setTitle(SWAGGER_TITLE)
            .setDescription(SWAGGER_DESCRIPTION)
            .setVersion(SWAGGER_VERSION)
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);
    }
}
