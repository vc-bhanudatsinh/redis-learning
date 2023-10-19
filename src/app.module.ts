import {
  BadRequestException,
  Module,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import env from './common/config/env.config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/global-exception.filter';
import { ResponseInterceptorsService } from './common/interceptors/response.interceptor';
import { errorMessages } from './common/config/messages.config';
import { TicketModule } from './ticket/ticket.module';
import { TicketController } from './ticket/ticket.controller';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: env.mongodbUri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 20000,
      max: 100,
      store: redisStore,
      host: '127.0.0.1',
      port: 6379,
    }),
    CommonModule,
    UserModule,
    TicketModule,
  ],
  controllers: [AppController, TicketController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useValue: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: ResponseInterceptorsService,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: CacheInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        exceptionFactory: (
          validationErrors: ValidationError[] = [],
        ): BadRequestException => {
          const errorKey = Object.keys(validationErrors[0].constraints)[0];
          return new BadRequestException(
            validationErrors[0].constraints[`${errorKey}`] ||
              errorMessages.UNEXPECTED_ERROR,
          );
        },
      }),
    },
  ],
  exports: [],
})
export class AppModule {}
