import { AxiosError, AxiosRequestConfig } from 'axios';
import type { Options } from 'axios-hooks';

export type UnknonwRecord = Record<string, unknown>;

export type VariablesType = Record<string, any>;

export interface AxiosHooksError extends AxiosError {
  errors?: Record<string, string>;
}

export interface UseFetchOption extends Options {
  variables?: VariablesType;
  onCompleted?: (data: any) => void;
  onError?: (error: AxiosHooksError) => void;
  beforeSend?: (payload: any) => any;
  onFinal?: () => void;
  notifyLoading?: boolean;
}

export type FetcherFuncType<DT> = (variables?: VariablesType, restConfig?: AxiosRequestConfig) => Promise<DT>;
