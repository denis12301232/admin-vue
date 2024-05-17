import type { AfterResponseHook } from 'ky';

export type QueryOptions = {
  afterResponse: AfterResponseHook;
};
