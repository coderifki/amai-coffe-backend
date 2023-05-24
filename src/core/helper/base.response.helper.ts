import { Response } from 'express';
import { BaseHttpResponseDto } from './application/dtos/base.http.response.dto';
import { BaseMessageResponseDto } from './application/dtos/base.message.response.dto';

export interface BaseHttpResponseHelperRequest<T, K> {
  res: Response;
  data: T;
  message: string;
  statusCode: number;
  error?: K;
}

export function baseHttpResponseHelper<T, K>(
  res: Response,
  props: BaseHttpResponseDto<T, K>,
): Response<BaseHttpResponseDto<T, K>> {
  // const builder =

  return res.status(props.statusCode).json(props);
}

export function baseMessageResponseHelper<T, K>(
  message: string,
  statusCode: number,
  data: T,
  error: K,
): BaseMessageResponseDto<T, K> {
  return {
    message,
    statusCode,
    data,
    error,
  };
}
