import React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CodeIcon from '@mui/icons-material/Code';
// import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

type Props = {
    content: React.ReactNode;
};

const PreFullScreenViewer: React.FC<Props> = ({ content }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton
                onClick={handleClickOpen}
                sx={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: '100' }}
            >
                <CodeIcon color="error" />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar sx={{ position: 'fixed' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box padding={2} paddingTop={10}>
                    {content}
                </Box>
            </Dialog>
        </div>
    );
};

export default PreFullScreenViewer;
