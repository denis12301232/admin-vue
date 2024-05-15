import { object, string, boolean } from 'yup';

export namespace Validation {
  export const registration = object({
    login: string().required(),
    password: string().required().min(6).max(20),
    remember: boolean(),
  });

  export const login = object({
    login: string().required(),
    password: string().required(),
    remember: boolean(),
  });
}
