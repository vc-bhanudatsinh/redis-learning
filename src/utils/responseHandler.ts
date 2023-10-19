import { CommonResponse } from '../common/types';

export class ResponseHandler {
  public static success<T>(
    statusCode: number,
    message: string,
    data: T | [] = [],
  ): CommonResponse<T> {
    return {
      status: true,
      statusCode,
      message,
      data,
      error: [],
    };
  }

  public static error<T>(
    statusCode: number,
    message: string,
    error: T | [],
  ): CommonResponse<T> {
    return {
      status: false,
      statusCode,
      message,
      data: [],
      error,
    };
  }
}
