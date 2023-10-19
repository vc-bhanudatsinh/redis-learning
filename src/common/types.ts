export interface CommonResponse<T = any> {
  status: boolean;
  message: string;
  statusCode: number;
  data: T | [];
  error: T | [];
}
