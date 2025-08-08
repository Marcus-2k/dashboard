import type { CognitoUserPoolConfig } from "@aws-amplify/core";
import { Amplify } from "aws-amplify";
import {
  confirmSignUp,
  type ConfirmSignUpOutput,
  fetchAuthSession,
  signIn,
  type SignInOutput,
  signInWithRedirect,
  signOut,
  signUp,
  type SignUpOutput,
} from "aws-amplify/auth";

export interface SignUpData {
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface ConfirmSignUpData {
  email: string;
  code: string;
}

export class AuthService {
  private isConfigured = false;

  private config: CognitoUserPoolConfig | null = null;

  configure(cognito: CognitoUserPoolConfig) {
    if (this.isConfigured) {
      return;
    }

    Amplify.configure({
      Auth: { Cognito: cognito },
    });

    this.config = cognito;

    this.isConfigured = true;
  }

  private ensureConfigured() {
    if (!this.isConfigured) {
      throw new Error("AWS Cognito is not configured");
    }
  }

  updateCurrentSession(): void {
    this.ensureConfigured();

    // from(fetchAuthSession({ forceRefresh: true }))
    //   .pipe(
    //     catchError((error) => {
    //       this.router.navigate(["/auth/sign-in"]);
    //       return throwError(() => error);
    //     }),
    //     filter((session) => {
    //       const isValid = !!session && !!session.tokens?.idToken;
    //       if (!isValid) {
    //         this.router.navigate(["/auth/sign-in"]);
    //       }
    //       return isValid;
    //     }),
    //     map((session) => {
    //       this.userService.setUser(session.tokens!.idToken!.payload as User);
    //     })
    //   )
    //   .subscribe({
    //     error: () => {
    //       this.router.navigate(["/auth/sign-in"]);
    //     },
    //   });
  }

  //   checkAuthenticationPromise(): Promise<boolean | undefined> {
  //     // this.ensureConfigured();
  //     // return this.validateCurrentUserSession().pipe().toPromise();
  //   }

  signUp({ email, password }: SignUpData): Promise<SignUpOutput> {
    return signUp({
      username: email,
      password: password,
    });
  }

  signIn(data: SignInData): Promise<SignInOutput> {
    const { email: username, password } = data;

    return signIn({ username, password });
  }

  confirmSignUp(data: ConfirmSignUpData): Promise<ConfirmSignUpOutput> {
    const { email, code } = data;

    return confirmSignUp({ username: email, confirmationCode: code });
  }

  async getUserToken(): Promise<string | undefined> {
    const result = await fetchAuthSession();

    if (!result.tokens?.idToken) {
      throw new Error("No id token found");
    }

    return result.tokens.idToken.toString();
  }

  async signInWithGoogleRedirect() {
    return signInWithRedirect({
      provider: "Google",
    });
  }

  async logout() {
    await signOut();
    // this.userService.clearUser();
    // this.router.navigate(["/auth/sign-in"]);
  }
}
