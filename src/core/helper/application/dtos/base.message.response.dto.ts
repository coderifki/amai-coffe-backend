export class BaseMessageResponseDto<T, K> {
  message: string;
  statusCode: number;
  data: T;
  error: K;
}
