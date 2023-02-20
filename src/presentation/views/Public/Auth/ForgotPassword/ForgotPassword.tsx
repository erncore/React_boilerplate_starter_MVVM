import * as React from 'react';
import { useIntl } from 'react-intl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FastField, useFormik } from 'formik';

const ForgotPassword = () => {
    const intl = useIntl();
    const formik = useFormik({
        initialValues: {} as any,
        onSubmit: async (values, { setErrors }) => {},
    });

    return (
        <>
            <Typography
                component="h1"
                variant="h4"
                dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({
                        id: 'auth.forgotPassword.title',
                    }),
                }}
                gutterBottom
            ></Typography>
            <Typography
                component="p"
                variant="body1"
                dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({
                        id: 'auth.forgotPassword.description',
                    }),
                }}
            ></Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FastField
                            name="email"
                            children={(fieldProps: any) => (
                                <TextField
                                    {...fieldProps.field}
                                    required
                                    fullWidth
                                    type="email"
                                    label={
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: intl.formatMessage({
                                                    id: 'auth.forgotPassword.email',
                                                }),
                                            }}
                                        ></span>
                                    }
                                    variant="standard"
                                    error={!formik.isValid ? Boolean(fieldProps.meta.error) : undefined}
                                    helperText={!formik.isValid && fieldProps.meta.error}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: intl.formatMessage({
                                id: 'auth.forgotPassword.button',
                            }),
                        }}
                    ></span>
                </Button>
            </Box>
        </>
    );
};

export default ForgotPassword;
