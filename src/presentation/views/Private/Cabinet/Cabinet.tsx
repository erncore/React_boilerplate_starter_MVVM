import { observer } from 'mobx-react';
import { AuthPaths, AuthRoutes } from 'presentation/routes/routes';
import CabinetLayout from 'presentation/views/layouts/cabinet/CabinetLayout';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Pages/Common

// styles
import st from './cabinet.module.scss';
import Security from './Common/Security';

const Cabinet: React.FC = () => {
    return (
        <CabinetLayout>
            <Routes>
                <Route path={AuthRoutes.security} element={<Security />} />
            </Routes>
        </CabinetLayout>
    );
};

export default observer(Cabinet);
