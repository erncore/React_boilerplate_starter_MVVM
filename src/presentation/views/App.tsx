import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
// types
// import { UserRoles } from "types";

// api config
import 'data/settings/axios';

// routing
import { Routes, Route } from 'react-router-dom';
import { AuthPaths, AuthRoutes, NonAuthRoutes } from 'presentation/routes/routes';

//  stores
import { observer } from 'mobx-react';

// views (pages)
// import AuthRoute from "'presentation/views/routes/AuthRoute";

//  styles

import 'presentation/views/assets/styles/global/index.scss';
import Auth from 'presentation/views/Public/Auth';
import { useViewModels } from 'presentation/view-model/ViewModelProvider';
import { ProtectedRouteContent } from 'presentation/routes/AuthRoute';
import Cabinet from './Private/Cabinet/Cabinet';
import { UserRoles } from 'domain/../types';

// Localization
import { IntlProvider } from 'react-intl';
import Germany from 'data/lang/de.json';
import English from 'data/lang/en.json';
import Home from './Public/Home';

const App = () => {
    const {
        authViewModel: { getUserAppAccess, isSync, isUserAuthorized, isManager },
        userViewModel,
    } = useViewModels();

    const [i18nStrings, setI18nStrings]: any = useState(Germany);

    useEffect(() => {
        getUserAppAccess();
    }, [getUserAppAccess]);

    useEffect(() => {
        if (isUserAuthorized) {
            userViewModel.loadUser().then(() => {});
        }
    }, [userViewModel, isUserAuthorized, isManager]);

    useEffect(() => {
        if (userViewModel.locale === 'en') {
            setI18nStrings(English);
        } else if (userViewModel.locale === 'de') {
            setI18nStrings(Germany);
        } else {
            setI18nStrings(English);
        }
    }, [userViewModel.locale]);

    if (isSync || userViewModel.isSync) return <LinearProgress />;

    return (
        <IntlProvider messages={i18nStrings} locale={userViewModel.locale} defaultLocale="de">
            <Routes>
                <Route path={NonAuthRoutes.auth} element={<Auth />} />
                <Route path={NonAuthRoutes.home} element={<Home />} />
                <Route
                    path={AuthRoutes.cabinet}
                    element={<ProtectedRouteContent requiredRoles={[UserRoles.manager]} element={<Cabinet />} />}
                />
            </Routes>
        </IntlProvider>
    );
};

export default observer(App);
