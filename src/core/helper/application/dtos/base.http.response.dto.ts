export class BaseHttpResponseDto<T, K> {
  message: string;
  statusCode: number;
  data: T;
  error: K;
}
