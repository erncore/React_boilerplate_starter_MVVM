import { Typography } from '@mui/material';
import { AppBar } from 'presentation/views/components/AppBar';
import React from 'react';
import st from './landingLayout.module.scss';

type LandingLayout = {
    children?: React.ReactNode;
};
console.log(st);

const LandingLayout: React.FC<LandingLayout> = ({ children }) => {
    return (
        <div className={st.container}>
            <AppBar />
            <div className={st.page}>{children}</div>
            <footer className={st.footer}>
                <Typography variant="h5" component={'h5'}>
                    Footer
                </Typography>
            </footer>
        </div>
    );
};
export default LandingLayout;
