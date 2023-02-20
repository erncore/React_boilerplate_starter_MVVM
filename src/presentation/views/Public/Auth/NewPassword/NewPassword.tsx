import * as React from 'react';
import { useIntl } from 'react-intl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FastField, useFormik } from 'formik';

const NewPassword = () => {
    const formik = useFormik({
        initialValues: {} as any,
        onSubmit: async (values, { setErrors }) => {},
    });
    const intl = useIntl();
    return (
        <>
            <Typography component="h1" variant="h4">
                New password
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FastField
                            name="password"
                            children={(fieldProps: any) => (
                                <TextField
                                    {...fieldProps.field}
                                    required
                                    fullWidth
                                    type="password"
                                    label={
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: intl.formatMessage({
                                                    id: 'auth.signup.password',
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
                        <FastField
                            name="password"
                            children={(fieldProps: any) => (
                                <TextField
                                    {...fieldProps.field}
                                    required
                                    fullWidth
                                    name="password"
                                    type="password"
                                    id="password"
                                    label={
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: intl.formatMessage({
                                                    id: 'auth.signup.password',
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
                    <Grid item xs={12} mb={3}>
                        <FastField
                            name="confirm_password"
                            children={(fieldProps: any) => (
                                <TextField
                                    {...fieldProps.field}
                                    required
                                    fullWidth
                                    name="confirm_password"
                                    type="password"
                                    id="password"
                                    label={
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: intl.formatMessage({
                                                    id: 'auth.signup.password',
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
                    Save
                </Button>
            </Box>
        </>
    );
};

export default NewPassword;
