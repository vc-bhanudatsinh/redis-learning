import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { CommonResponse } from '../types';

@Injectable()
export class ResponseInterceptorsService implements NestInterceptor {
  intercept(context: ExecutionContext, nest: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    return nest.handle().pipe(
      map((sentResponse: CommonResponse<any>) => {
        if (sentResponse?.statusCode) response.status(sentResponse.statusCode);
        return sentResponse;
      }),
    );
  }
}
