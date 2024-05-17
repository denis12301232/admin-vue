import { object, string } from 'yup';

export namespace Validation {
  export const signUp = object({
    email: string().required().email(),
    password: string().required().min(8).max(20),
    first_name: string().required(),
    second_name: string().required(),
  });

  export const signIn = object({
    email: string().required().email(),
    password: string().required().min(8).max(20),
  });

  export const forgotPassword = object({
    email: string().required().email(),
    new_password: string().required().min(8).max(20),
  });

  export const apiTokensRequest = object({
    api_token_name: string().required(),
  });
}
