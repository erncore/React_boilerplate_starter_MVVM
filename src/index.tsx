import React from 'react';
import { ViewModelsProvider } from 'presentation/view-model/ViewModelProvider';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import primaryMuiTheme from 'presentation/views/layouts/themes/primaryMuiTheme';
import { StyledEngineProvider } from '@mui/material/styles';

import App from 'presentation/views/App';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from 'presentation/views/components/ScrollToTop/ScrollToTop';

const container = document.getElementById('root');
const root = createRoot(container as any);

root.render(
    <ViewModelsProvider>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={primaryMuiTheme}>
                <CssBaseline />
                <Router>
                    <ScrollToTop />

                    <App />
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    </ViewModelsProvider>
);
