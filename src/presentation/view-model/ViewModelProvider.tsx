import React from 'react';

// Repository Imps
import AuthApi from 'data/auth/AuthApi';
import LocalStorageApi from 'data/client/LocalStorageApi';
import UserApi from 'data/user/UserApi';

// Models
import AuthModel from 'domain/entity/auth/AuthModel';
import UserModel from 'domain/entity/user/UserModel';

// UseCases
import LoginUseCase from 'domain/interactors/auth/LoginUseCase';
import RegisterUseCase from 'domain/interactors/auth/RegisterUseCase';
import LogoutUseCase from 'domain/interactors/auth/LogoutUseCase';
import GetUserAppAccessUseCase from 'domain/interactors/auth/GetUserAppAccessUseCase';
import ChangeUserPasswordUseCase from 'domain/interactors/auth/ChangePasswordUseCase';
import DeleteAccountUseCase from 'domain/interactors/auth/DeleteAccountUseCase';

// ViewModels
import UIViewModel from 'presentation/view-model/ui/UIViewModel';
import AuthViewModel from './auth/AuthViewModel';
import UserViewModel from './user/UserViewModel';
import LoadUserUseCase from 'domain/interactors/user/LoadUserUseCase';

type ViewModelsContextValue = {
    uIViewModel: UIViewModel;
    authViewModel: AuthViewModel;
    userViewModel: UserViewModel;
};

// dataLayer init
const authRepository = new AuthApi();
const clientRepository = new LocalStorageApi();
const userRepository = new UserApi();

// models init
const uIViewModel = new UIViewModel();
const authModel = new AuthModel();
const userModel = new UserModel();

// useCases init
const loginUseCase = new LoginUseCase(authRepository, clientRepository, authModel);
const registerUseCase = new RegisterUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(clientRepository, authModel);
const getUserAppAccessUseCase = new GetUserAppAccessUseCase(
    authRepository,
    clientRepository,
    userRepository,
    authModel,
    userModel
);
const changeUserPasswordUseCase = new ChangeUserPasswordUseCase(authRepository);
const deleteAccountUseCase = new DeleteAccountUseCase(authRepository, clientRepository);
const loadUserUseCase = new LoadUserUseCase(userRepository, userModel);

// viewModel init
const authViewModel = new AuthViewModel(
    loginUseCase,
    registerUseCase,
    logoutUseCase,
    getUserAppAccessUseCase,
    changeUserPasswordUseCase,
    deleteAccountUseCase,
    authModel
);
const userViewModel = new UserViewModel(userModel, loadUserUseCase);

// ViewModelsContext
const ViewModelsContext = React.createContext<ViewModelsContextValue>({} as ViewModelsContextValue);

export const ViewModelsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <ViewModelsContext.Provider
            value={{
                uIViewModel,
                authViewModel,
                userViewModel,
            }}
        >
            {children}
        </ViewModelsContext.Provider>
    );
};

export const useViewModels = () => React.useContext(ViewModelsContext);
