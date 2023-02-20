import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: 'rgba(5, 20, 75, 1)',
            light: 'rgba(5, 20, 75, 0.64)',
            light1: 'rgba(5, 20, 75, 0.56)',
            light2: 'rgba(225, 227, 233, 1)',
            contrastText: 'rgba(255, 255, 255, 1)',
        },
        secondary: {
            main: 'rgba(0, 185, 255, 1)',
            light2: 'rgba(0, 185, 255, 0.08)',
        },
        action: {
            disabled: 'rgba(175, 180, 197, 1)',
        },
    },
});

const primaryMuiTheme = createTheme({
    typography: {
        fontFamily: 'Codec Pro',

        h1: {
            fontWeight: '700',
            fontSize: '64px',
            lineHeight: '60px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '48px',
                lineHeight: '44px',
            },
        },
        h2: {
            fontWeight: '700',
            fontSize: '56px',
            lineHeight: '52px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '40px',
                lineHeight: '36px',
            },
        },
        h3: {
            fontWeight: '700',
            fontSize: '48px',
            lineHeight: '44px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '32px',
                lineHeight: '28px',
            },
        },
        h4: {
            fontWeight: '700',
            fontSize: '40px',
            lineHeight: '36px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '24px',
                lineHeight: '20px',
            },
        },
        h5: {
            fontWeight: '700',
            fontSize: '32px',
            lineHeight: '28px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '20px',
                lineHeight: '16px',
            },
        },
        h6: {
            fontWeight: '700',
            fontSize: '18px',
            lineHeight: '14px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '16px',
                lineHeight: '14px',
            },
        },
        t2: {
            fontWeight: '700' as 'bold',
            fontSize: '20px',
            lineHeight: '20px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '18px',
                lineHeight: '18px',
            },
        },
        t2news: {
            fontWeight: '300' as 'bold',
            fontSize: '14px',
            lineHeight: '16px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '13px',
                lineHeight: '14px',
            },
        },
        t3: {
            fontWeight: '700' as 'bold',
            fontSize: '18px',
            lineHeight: '18px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '16px',
                lineHeight: '16px',
            },
        },
        t3s: {
            fontWeight: '700' as 'bold',
            fontSize: '16px',
            lineHeight: '16px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '14px',
                lineHeight: '14px',
            },
        },
        t4: {
            fontWeight: '700' as 'bold',
            fontSize: '14px',
            lineHeight: '14px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '14px',
                lineHeight: '14px',
            },
        },
        d1: {
            fontWeight: '300' as 'bold',
            fontSize: '18px',
            lineHeight: '18px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '14px',
                lineHeight: '14px',
            },
        },
        d1s: {
            fontWeight: '300' as 'bold',
            fontSize: '16px',
            lineHeight: '16px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '14px',
                lineHeight: '14px',
            },
        },
        d2: {
            fontWeight: '300' as 'bold',
            fontSize: '14px',
            lineHeight: '16px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '16px',
                lineHeight: '14px',
            },
        },
        d3: {
            fontWeight: '300' as 'bold',
            fontSize: '13px',
            lineHeight: '13px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '16px',
                lineHeight: '14px',
            },
        },
        p5: {
            fontWeight: '300' as 'bold',
            fontSize: '18px',
            lineHeight: '26px',
            letterSpacing: '-0.02em',
            [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '16px',
                lineHeight: '14px',
            },
        },
        button: {
            fontWeight: '600' as 'bold',
            fontSize: '16px',
            lineHeight: '16px',
            letterSpacing: '-0.02em',
            textTransform: 'none',
        },
        inputText: { fontWeight: '700' as 'bold', fontSize: '18px', lineHeight: '20px', letterSpacing: '-0.02em' },
        helpertext: { fontWeight: '300' as 'bold', fontSize: '12px', lineHeight: '20px', letterSpacing: '-0.02em' },
        label: { fontWeight: '700' as 'bold', fontSize: '14px', lineHeight: '14px', letterSpacing: '-0.02em' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '40px',
                    width: '253px',
                    height: '64px',
                    fontSize: '16px',
                    fontFamily: '$font-family-base',
                    fontWeight: '600' as 'bold', // тут 600, но mui не позволяет тип
                    lineHeight: '1em',
                    letterSpacing: '-0.02em',

                    color: '#fff',
                    textTransform: 'none',
                    boxShadow: 'none',
                    transition: '.2s ease',
                    ':disabled': {
                        // display: 'none'
                        background: 'transparent',
                        borderColor: '#AFB4C5',
                        color: '#AFB4C5',
                        cursor: 'not-allowed',
                    },
                    ':active': {
                        transform: 'scale(0.94)',
                    },
                    [defaultTheme.breakpoints.down('sm')]: {
                        width: '100%',
                        height: '48px',
                    },
                },
            },
            variants: [
                {
                    props: { variant: 'outlined', color: 'primary' },
                    style: {
                        textTransform: 'none',
                        backgroundColor: 'transparent',
                        border: `1px solid ${defaultTheme.palette.primary.main}`,
                        color: defaultTheme.palette.primary.main,
                        ':hover': {
                            border: `1px solid ${defaultTheme.palette.primary.main}`,
                            backgroundColor: defaultTheme.palette.primary.main,
                            boxShadow: 'none',
                            color: 'white',
                        },
                    },
                },
                {
                    props: { variant: 'outlined', color: 'secondary' },
                    style: {
                        textTransform: 'none',
                        backgroundColor: 'transparent',
                        border: `1px solid ${defaultTheme.palette.secondary.main}`,
                        color: defaultTheme.palette.secondary.main,
                        ':hover': {
                            border: `1px solid ${defaultTheme.palette.secondary.main}`,
                            backgroundColor: defaultTheme.palette.secondary.main,
                            boxShadow: 'none',
                            color: 'white',
                        },
                    },
                },
                {
                    props: { variant: 'contained', color: 'primary' },
                    style: {
                        textTransform: 'none',
                        backgroundColor: defaultTheme.palette.primary.main,
                        border: `1px solid ${defaultTheme.palette.primary.main}`,
                        ':hover': {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            color: defaultTheme.palette.primary.main,
                        },
                    },
                },
                {
                    props: { variant: 'contained', color: 'secondary' },
                    style: {
                        textTransform: 'none',
                        backgroundColor: defaultTheme.palette.secondary.main,
                        border: `1px solid ${defaultTheme.palette.secondary.main}`,
                        ':hover': {
                            backgroundColor: defaultTheme.palette.primary.main,
                            borderColor: defaultTheme.palette.primary.main,
                            boxShadow: 'none',
                            color: '#fff',
                        },
                    },
                },
                {
                    props: { variant: 'circle', color: 'primary' },
                    style: {
                        textTransform: 'none',
                        backgroundColor: defaultTheme.palette.primary.main,
                        border: `1px solid ${defaultTheme.palette.primary.main}`,
                        ':hover': {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            color: defaultTheme.palette.primary.main,
                        },
                    },
                },
                {
                    props: { variant: 'circle', color: 'secondary' },
                    style: {
                        textTransform: 'none',
                        backgroundColor: defaultTheme.palette.secondary.main,
                        border: `1px solid ${defaultTheme.palette.secondary.main}`,
                        ':hover': {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            color: defaultTheme.palette.secondary.main,
                        },
                    },
                },

                // types
                {
                    props: { variant: 'circle', size: 'large' },
                    style: {
                        padding: '0px !important',
                        width: '80px !important',
                        height: '80px !important',
                    },
                },
                {
                    props: { variant: 'circle', size: 'medium' },
                    style: {
                        padding: '0 !important',
                        width: '64px !important',
                        height: '64px !important',
                    },
                },
                {
                    props: { variant: 'circle', size: 'small' },
                    style: {
                        padding: '0 !important',
                        width: '32px !important',
                        height: '32px !important',
                    },
                },

                // sizes
                {
                    props: { size: 'large' },
                    style: {
                        padding: '24px 56px',
                        height: '64px',
                    },
                },
                {
                    props: { size: 'medium' },
                    style: {
                        padding: '20px 40px',
                        height: '56px',
                    },
                },
                {
                    props: { size: 'small' },
                    style: {
                        padding: '16px 40px',
                        height: '48px',
                    },
                },
            ],
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& input, label, textarea': {
                        fontWeight: '700',
                        fontFamily: 'Codec Pro',
                        fontSize: '18px',
                        lineHeight: '20px',
                        letterSpacing: '-0.02em',
                        color: defaultTheme.palette.primary.main,
                        ':placeholder': {
                            fontSize: '18px',
                            lineHeight: '20px',
                            letterSpacing: '-0.02em',
                            color: defaultTheme.palette.primary.main,
                        },
                    },
                    '& input, textarea': {
                        paddingBottom: '14px',
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: '#05144B',
                        opacity: '.12',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#05144B',
                    },
                    '& label.MuiFormLabel-filled, label.Mui-focused': {
                        opacity: '0.56',
                        fontSize: '18px',
                        lineHeight: '20px',
                        letterSpacing: '-0.02em',
                        color: `${defaultTheme.palette.primary.main} !important`,
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    padding: '24px 40px',

                    ':hover': {
                        background: defaultTheme.palette.secondary.main,
                        '& .MuiListItemText-primary': {
                            color: '#fff',
                        },
                    },
                    '& .MuiListItemText-primary': {
                        fontFamily: 'Codec Pro',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        lineHeight: '18px',
                        background: 'transparent',
                        color: defaultTheme.palette.primary.main,
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontFamily: 'Codec Pro',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    lineHeight: '20px',
                    color: 'rgba(175, 180, 197, 1)',
                    '&.Mui-selected': {
                        color: defaultTheme.palette.secondary.main,
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    marginBottom: '24px',
                    '& .MuiTabs-indicator': {
                        display: 'none',
                    },
                },
            },
        },
    },
});

export default primaryMuiTheme;
export { defaultTheme };
