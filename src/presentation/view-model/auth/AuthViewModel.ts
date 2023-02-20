import { action, computed, makeAutoObservable } from 'mobx';
import AuthModel from 'domain/entity/auth/AuthModel';

import LoginUseCase from 'domain/interactors/auth/LoginUseCase';
import LogoutUseCase from 'domain/interactors/auth/LogoutUseCase';
import RegisterUseCase from 'domain/interactors/auth/RegisterUseCase';
import GetUserAppAccessUseCase from 'domain/interactors/auth/GetUserAppAccessUseCase';
import { SubmissionError, ValidationError } from 'domain/interactors/CustomErrors';
import { UserRoles } from 'domain/../types';
import ChangeUserPasswordUseCase from 'domain/interactors/auth/ChangePasswordUseCase';
import DeleteAccountUseCase from 'domain/interactors/auth/DeleteAccountUseCase';
import { registerDTO } from 'domain/repository/auth/structures/registerDTO';
import { loginDTO } from 'domain/repository/auth/structures/loginDTO';

// import { UserRoles } from "../.././../types";

export default class AuthViewModel {
    public isShowError: boolean;
    public signUpSubmitError: string;
    public signInSubmitError: string;
    public successSignUpPopupIsActive: boolean;
    public errorSignUpPopupIsActive: boolean;
    public isSignInSubmissionErrorVisible: boolean;
    public isSignUpSubmissionErrorVisible: boolean;
    public isSync: boolean;

    private loginUseCase: LoginUseCase;
    private logoutUseCase: LogoutUseCase;
    private registerUseCase: RegisterUseCase;
    public getUserAppAccessUseCase: GetUserAppAccessUseCase;
    private changeUserPasswordUseCase: ChangeUserPasswordUseCase;
    private deleteAccountUseCase: DeleteAccountUseCase;

    private authModel: AuthModel;

    constructor(
        loginUseCase: LoginUseCase,
        registeruseCase: RegisterUseCase,
        logoutUseCase: LogoutUseCase,
        getUserAppAccessUseCase: GetUserAppAccessUseCase,
        changeUserPasswordUseCase: ChangeUserPasswordUseCase,
        deleteAccountUseCase: DeleteAccountUseCase,
        authModel: AuthModel
    ) {
        makeAutoObservable(this);
        this.isShowError = false;
        this.signUpSubmitError = '';
        this.signInSubmitError = '';
        this.isSignInSubmissionErrorVisible = false;
        this.isSignUpSubmissionErrorVisible = false;

        this.successSignUpPopupIsActive = false;
        this.errorSignUpPopupIsActive = false;
        this.isSync = true;

        // use cases
        this.loginUseCase = loginUseCase;
        this.logoutUseCase = logoutUseCase;
        this.registerUseCase = registeruseCase;
        this.getUserAppAccessUseCase = getUserAppAccessUseCase;
        this.changeUserPasswordUseCase = changeUserPasswordUseCase;
        this.deleteAccountUseCase = deleteAccountUseCase;
        this.authModel = authModel;

        // this.runInterceptor();
    }

    @action public onClickSignIn = (data: loginDTO) => {
        this.isSignInSubmissionErrorVisible = false;
        this.isShowError = false;

        return this.loginUseCase
            .loginUser(data)
            .catch(
                action((error) => {
                    if (error instanceof SubmissionError) {
                        const submissionError = error as SubmissionError;
                        this.signInSubmitError = submissionError.errorDescription;
                        this.isSignInSubmissionErrorVisible = true;

                        return submissionError.errors;
                    }
                })
            )
            .finally(
                action(() => {
                    this.isSync = false;
                })
            );
    };

    public validateSignUpForm = (values: any): object => {
        return this.authModel.validateSignUp(values);
    };

    public validateSignInForm = (values: any): object => {
        return this.authModel.validateSignIn(values);
    };

    public validateChangePasswordForm = (values: any): object => {
        return this.authModel.validateChangePassword(values);
    };

    public validateDeleteAccountForm = (values: any): object => {
        return this.authModel.validateDeleteAccount(values);
    };

    @action public onClickGoogleLogin = async (googleToken: string) => {
        this.isSync = true;
        this.isShowError = false;

        this.loginUseCase
            .googleLogin(googleToken)
            .then(({ data }: any) => {})
            .catch(
                action(({ response }) => {
                    this.signInSubmitError = response.data.message;
                    this.isShowError = true;
                })
            )
            .finally(
                action(() => {
                    this.isSync = false;
                })
            );
    };

    @action public onClickSignUp = (data: registerDTO): Promise<any> => {
        this.isShowError = false;

        return this.registerUseCase
            .register(data)
            .then(
                action(() => {
                    this.showSuccessSignUpPopup();
                })
            )
            .catch(
                action((error) => {
                    if (error instanceof SubmissionError) {
                        const submissionError = error as SubmissionError;
                        this.signUpSubmitError = submissionError.errorDescription;
                        this.isSignUpSubmissionErrorVisible = true;

                        return submissionError.errors;
                    }
                })
            )
            .finally(
                action(() => {
                    this.isSync = false;
                })
            );
    };

    @action public onClickSignOut = () => {
        this.logoutUseCase.logout();
    };

    public onClickChangePassword = (currentPassword: string, newPassword: string, confirmNewPassword: string) => {
        return this.changeUserPasswordUseCase
            .start(currentPassword, newPassword, confirmNewPassword)
            .then(
                action(() => {
                    console.log('password updated');
                })
            )
            .catch(
                action((error) => {
                    if (error instanceof SubmissionError) {
                        const submissionError = error as SubmissionError;

                        return submissionError.errors;
                    }
                    if (error instanceof ValidationError) {
                        const validationError = error as ValidationError;
                        return validationError.errors;
                    }

                    return error;
                })
            );
    };

    public onClickDeleteAccount = (currentPassword: string) => {
        return this.deleteAccountUseCase
            .start(currentPassword)
            .then(
                action(() => {
                    window.location.reload();
                })
            )
            .catch(
                action((error) => {
                    if (error instanceof SubmissionError) {
                        const submissionError = error as SubmissionError;

                        return submissionError.errors;
                    }
                    if (error instanceof ValidationError) {
                        const validationError = error as ValidationError;
                        return validationError.errors;
                    }

                    return error;
                })
            );
    };

    @computed public get isUserAuthorized(): boolean {
        return this.authModel.isUserAuthorized;
    }

    @computed public get userRoles(): UserRoles[] {
        return this.authModel.userRoles;
    }

    @computed public get isManager(): boolean {
        return !!this.userRoles.filter((userRole) => userRole === UserRoles.manager)[0];
    }

    @computed public get signupInitFields(): any {
        return {
            type: UserRoles.manager,
            email: '2test@proton.com',
            password: 'asdfjkl',
            confirm_password: 'asdfjkl',
        };
    }

    @computed public get signinInitFields(): any {
        return {
            email: 'foobar2',
            password: 'asdfjkl',
        };
    }

    @action getUserAppAccess = () => {
        this.isSync = true;

        this.getUserAppAccessUseCase.start().finally(
            action(() => {
                this.isSync = false;
            })
        );
    };

    @action public showSuccessSignUpPopup = () => {
        this.successSignUpPopupIsActive = true;
    };
    @action public hideSuccessSignUpPopup = () => {
        this.successSignUpPopupIsActive = false;
    };

    @action public showErrorSignUpPopup = () => {
        this.errorSignUpPopupIsActive = true;
    };
    @action public hideErrorSignUpPopup = () => {
        this.errorSignUpPopupIsActive = false;
    };
}
