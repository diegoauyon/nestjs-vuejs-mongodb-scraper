import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BoatModule } from './boat/boat.module';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {LoggingInterceptor} from './interceptors/logging.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/boats', { useNewUrlParser: true }),
    BoatModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }],
})
export class AppModule { }
