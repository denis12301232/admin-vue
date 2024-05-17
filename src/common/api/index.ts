import type { Auth } from '@/types';
import ky from 'ky';
import { API_URL } from '@/utils';
import { useStore } from '@/stores';

export const $auth = ky.create({
  prefixUrl: API_URL,
  //credentials: 'include',
});
export const $api = $auth.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
      },
    ],
    afterResponse: [
      (request, options, response) => {
        const store = useStore();
        if (response.status === 401 && store.isAuth) {
          return $auth
            .post('auth/refresh')
            .json<Auth.Refresh.Response>()
            .then((json) => {
              localStorage.setItem('access_token', json.access_token);
              localStorage.setItem('refresh_token', json.refresh_token);
            })
            .then(() => ky(request));
        }
      },
    ],
  },
});
