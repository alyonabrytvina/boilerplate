import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BootstrapConfigModule } from './bootstrap/config.module';

@Module({
  imports: [
    BootstrapConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    })
  ],
  controllers: [],
  providers: [],

})

export class AppModule {}
