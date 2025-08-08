import type { CognitoUserPoolConfig } from "@aws-amplify/core";

export interface Environment {
  environment: string;
  amplify: {
    Cognito: CognitoUserPoolConfig;
  };
}

export const environment = {
  environment: "prod",
  amplify: {
    Cognito: {
      userPoolId: "eu-central-1_TP929SoC0",
      userPoolClientId: "3012tuakr83p9ugj1tupio6oeb",
      loginWith: {
        email: true,
        oauth: {
          domain: "eu-central-1tp929soc0.auth.eu-central-1.amazoncognito.com",
          scopes: ["openid", "email", "profile"],
          redirectSignIn: ["https://localhost:4200/"],
          redirectSignOut: ["https://localhost:4200/"],
          responseType: "code",
          providers: ["Google"],
        },
      },
      userAttributes: {
        name: { required: true },
        email: { required: true },
      },
    },
  },
};
