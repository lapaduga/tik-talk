import { canActivateAuth } from "./lib/auth/access.guard";
import { Auth } from "./lib/auth/auth";
import { authTokenInterceptor } from "./lib/auth/auth.interceptor";
import { LoginPage } from "./lib/feature-login/login-page/login-page";

export {
	canActivateAuth,
	authTokenInterceptor,
	LoginPage,
	Auth as AuthService
}