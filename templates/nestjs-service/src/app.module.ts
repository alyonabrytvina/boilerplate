import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/config';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [ConfigModule.forRoot({isGlobal: true, load: [config]})],
})
export class AppModule {
}
