import React from 'react';
import { UserRoles } from '../../types';
import { Route, Navigate } from 'react-router-dom';
import { useViewModels } from 'presentation/view-model/ViewModelProvider';
import { NonAuthPaths, NonAuthRoutes } from './routes';
import { observer } from 'mobx-react';

interface Props {
    element: any;
    requiredRoles?: Array<UserRoles>;
}
const ProtectedRouteContent = observer(({ element, requiredRoles }: Props) => {
    const {
        authViewModel: { isUserAuthorized, userRoles },
    } = useViewModels();
    const hasRequestedRoles = requiredRoles?.includes(userRoles[0]);
    return isUserAuthorized && hasRequestedRoles ? (
        element
    ) : (
        <Navigate
            to={{
                pathname: NonAuthPaths.signin,
            }}
        />
    );
});

export { ProtectedRouteContent };
