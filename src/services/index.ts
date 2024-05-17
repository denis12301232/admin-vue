import ApiTokensService from './service.api.tokens';
import AuthService from './service.auth';

export namespace Api {
  export const Auth = AuthService;
  export const Tokens = ApiTokensService;
}
