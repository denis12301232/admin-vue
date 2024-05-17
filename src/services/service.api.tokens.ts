import type { ApiTokens, QueryOptions } from '@/types';
import { $api } from '@/common/api';

export default abstract class ApiTokensService {
  private static readonly PREFIX = 'api-keys';

  static createRequest(json: ApiTokens.CreateRequest.Body) {
    return $api
      .post(`${ApiTokensService.PREFIX}/request`, { json })
      .json<ApiTokens.CreateRequest.Response>();
  }

  static createConfirm(json: ApiTokens.CreateConfirm.Body, options?: QueryOptions) {
    return $api
      .post(`${ApiTokensService.PREFIX}/confirm`, {
        json,
        hooks: {
          afterResponse: options?.afterResponse && [options.afterResponse],
        },
      })
      .json<ApiTokens.CreateConfirm.Response>();
  }
}
