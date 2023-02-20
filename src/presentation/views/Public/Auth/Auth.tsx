import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react';
import { AuthRoutes, NonAuthRoutes } from 'presentation/routes/routes';
import { useViewModels } from 'presentation/view-model/ViewModelProvider';
import LandingLayout from 'presentation/views/layouts/landing';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import NewPassword from './NewPassword';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Auth: React.FC = () => {
    const {
        authViewModel: { isUserAuthorized },
    } = useViewModels();

    if (isUserAuthorized) return <Navigate to={NonAuthRoutes.home} />;

    return (
        <LandingLayout>
            <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center' }}>
                <Grid item xs={false} sm={1} />
                <Grid item xs={12} sm={8} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'column',
                        }}
                    >
                        <Routes>
                            <Route path={NonAuthRoutes.signin} element={<SignIn />} />
                            <Route path={NonAuthRoutes.signup} element={<SignUp />} />
                            <Route path={NonAuthRoutes.forgotPassword} element={<ForgotPassword />} />
                            <Route path={NonAuthRoutes.newPassword} element={<NewPassword />} />
                            <Route element={<Navigate to={AuthRoutes.cabinet} />} />
                        </Routes>
                    </Box>
                </Grid>
                <Grid item xs={false} sm={1} />
            </Grid>
        </LandingLayout>
    );
};

export default observer(Auth);
