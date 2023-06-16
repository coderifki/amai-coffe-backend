export class BaseHttpResponseDto<T, K> {
  message: string;
  statusCode: number;
  data: T;
  error: K;
}

export class BaseHttpPaginationResponseDto<T, K> extends BaseHttpResponseDto<
  T,
  K
> {
  total: number;
  page: number;
  per_page: number;
  total_per_page: number;
}
