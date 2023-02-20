import React from 'react';
import { Box, Grid, List, ListItemButton, ListItemText } from '@mui/material';
import { defaultTheme } from 'presentation/views/layouts/themes/primaryMuiTheme';
import { Link } from 'react-router-dom';
import { AuthPaths } from 'presentation/routes/routes';

// styles
import st from './cabinetLayout.module.scss';

const CabinetLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Grid container>
            <Grid
                item
                xs={3}
                sx={{
                    background: defaultTheme.palette.secondary.light2,
                    minHeight: '46vh',
                    display: { xs: 'none', md: 'block' },
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <List component="nav" aria-label="main mailbox folders">
                        <Link to={AuthPaths.dashboard}>
                            <ListItemButton>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </Link>
                        <Link to={AuthPaths.security}>
                            <ListItemButton>
                                <ListItemText primary="Security Settings" />
                            </ListItemButton>
                        </Link>
                    </List>
                </Box>
            </Grid>
            <Grid item xs={12} md={9} className={st.content}>
                {children}
            </Grid>
        </Grid>
    );
};

export default CabinetLayout;
