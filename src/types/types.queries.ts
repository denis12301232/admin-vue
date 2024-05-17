export namespace Auth {
  export namespace SignUp {
    export interface Body {
      email: string;
      password: string;
      first_name: string;
      second_name: string;
    }

    export interface Response {
      twofa: {
        token: string;
      };
    }
  }

  export namespace TwoFaCode {
    export interface Body {
      code_token: string;
      code: string;
    }

    export interface Response {
      access_token: string;
      refresh_token: string;
    }
  }

  export namespace SignIn {
    export interface Body {
      email: string;
      password: string;
    }

    export interface Response {
      twofa: {
        token: string;
      };
    }
  }

  export namespace Refresh {
    export interface Response {
      access_token: string;
      refresh_token: string;
    }

    export interface Body {
      token: string;
    }
  }

  export namespace ResetPasswordRequest {
    export interface Body {
      email: string;
      new_password: string;
    }

    export interface Response {
      code_token: string;
    }
  }

  export namespace ResetPasswordComplete {
    export interface Body {
      code_token: string;
      new_password: string;
      code: string;
    }

    export interface Response {
      access_token: string;
      refresh_token: string;
    }
  }
}

export namespace ApiTokens {
  export namespace CreateRequest {
    export interface Body {
      api_token_name: string;
    }

    export interface Response {
      code_token: string;
    }
  }

  export namespace CreateConfirm {
    export interface Body {
      code_token: string;
      api_token_name: string;
      code: string;
    }
    export interface Response {
      credentials: {
        token: string;
        secret: string;
      };
    }
  }
}
