import type { Auth } from '@/types';
import { $api } from '@/common/api';
import { useStore } from '@/stores';

export default abstract class AuthService {
  private static readonly PREFIX = 'auth';

  static signIn(json: Auth.SignIn.Body) {
    return $api.post(`${AuthService.PREFIX}/sign-in`, { json }).json<Auth.SignIn.Response>();
  }

  static signUp(json: Auth.SignUp.Body) {
    return $api.post(`${AuthService.PREFIX}/sign-up`, { json }).json<Auth.SignUp.Response>();
  }

  static twoFaCode(json: Auth.TwoFaCode.Body) {
    return $api
      .post(`${AuthService.PREFIX}/code`, {
        json,
        hooks: {
          afterResponse: [
            (request, options, response) => {
              if (response.ok) {
                response.json().then((json: Auth.TwoFaCode.Response) => {
                  localStorage.setItem('access_token', json.access_token);
                  localStorage.setItem('refresh_token', json.refresh_token);
                  useStore().isAuth = true;
                });
              }
            },
          ],
        },
      })
      .then(() => null);
  }

  static refresh(json: Auth.Refresh.Body) {
    return $api.post(`${AuthService.PREFIX}/refresh`, {
      json,
      hooks: {
        afterResponse: [
          (request, options, response) => {
            if (response.ok) {
              response.json().then((json: Auth.Refresh.Response) => {
                localStorage.setItem('access_token', json.access_token);
                localStorage.setItem('refresh_token', json.refresh_token);
                useStore().isAuth = true;
              });
            }
          },
        ],
      },
    });
  }

  static resetPasswordRequest(json: Auth.ResetPasswordRequest.Body) {
    return $api
      .post(`${AuthService.PREFIX}/reset-password-request`, { json })
      .json<Auth.ResetPasswordRequest.Response>();
  }

  static resetPasswordComplete(json: Auth.ResetPasswordComplete.Body) {
    return $api.post(`${AuthService.PREFIX}/reset-password-complete`, {
      json,
      hooks: {
        afterResponse: [
          (request, options, response) => {
            if (response.ok) {
              response.json().then((json: Auth.ResetPasswordComplete.Response) => {
                localStorage.setItem('access_token', json.access_token);
                localStorage.setItem('refresh_token', json.refresh_token);
                useStore().isAuth = true;
              });
            }
          },
        ],
      },
    });
  }

  static logout() {
    useStore().isAuth = false;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
