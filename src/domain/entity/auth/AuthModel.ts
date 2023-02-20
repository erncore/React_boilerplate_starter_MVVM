import { action, computed, makeAutoObservable } from 'mobx';
import { UserRoles } from 'domain/../types';
import cleanDeep from 'clean-deep';
import validator from 'validator';

export default class AuthModel {
    private isAuthorized: boolean;
    private roles: UserRoles[];

    public constructor() {
        makeAutoObservable(this);
        this.isAuthorized = false;
        this.roles = [];
    }

    @action public onSignedIn(roles: UserRoles[]) {
        this.isAuthorized = true;
        this.roles = roles;
    }

    @action public onLogout() {
        this.isAuthorized = false;
        this.roles = [];
    }

    public validateSignUp = (values: any): object => {
        const errors: any = {
            email: (() => {
                if (!values.email) return 'required';
                if (!validator.isEmail(values.email)) return 'Invalid email';
            })(),
            password: (() => {
                if (!values.password) return 'required';
                if (values.password.length < 6) return 'at least 6 symbols';
                if (values.confirm_password && values.confirm_password !== values.password)
                    return 'password does not match';
            })(),
            confirm_password: (() => {
                if (!values.confirm_password) return 'required';
                if (values.confirm_password !== values.password) return 'password does not match';
            })(),
            type: (() => {
                if (!values.type) return 'required';
                if (![UserRoles.manager, UserRoles.guest].includes(values.type)) return 'Invalid role';
            })(),
        };
        // убираем пустые поля
        const cleanedErrors = cleanDeep(errors);
        return cleanedErrors;
    };
    // убрать cleanedErrors во viewmodel  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    public validateSignIn = (values: any): object => {
        const errors: any = {
            email: (() => {
                if (!values.email) return 'required';
            })(),
            password: (() => {
                if (!values.password) return 'required';
            })(),
        };
        // убираем пустые поля
        const cleanedErrors = cleanDeep(errors);
        return cleanedErrors;
    };

    public validateChangePassword = (values: any): object => {
        const errors: any = {
            currentPassword: (() => {
                if (!values.currentPassword) return 'required';
            })(),
            newPassword: (() => {
                if (!values.newPassword) return 'required';
                if (values.confirmNewPassword && values.confirmNewPassword !== values.newPassword)
                    return 'password does not match';
            })(),
            confirmNewPassword: (() => {
                if (!values.confirmNewPassword) return 'required';
                if (values.confirmNewPassword !== values.newPassword) return 'password does not match';
            })(),
        };

        const cleanedErrors = cleanDeep(errors);
        return cleanedErrors;
    };

    public validateDeleteAccount = (values: any): object => {
        const errors: any = {
            currentPassword: (() => {
                if (!values.currentPassword) return 'required';
            })(),
        };

        const cleanedErrors = cleanDeep(errors);
        return cleanedErrors;
    };

    @computed public get isUserAuthorized(): boolean {
        return this.isAuthorized;
    }
    @computed public get userRoles(): UserRoles[] {
        return this.roles;
    }
}
