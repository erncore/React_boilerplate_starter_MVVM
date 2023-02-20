import * as React from 'react';
import { useIntl } from 'react-intl';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { NonAuthPaths } from 'presentation/routes/routes';
import { useViewModels } from 'presentation/view-model/ViewModelProvider';
import { FastField, FormikProvider, useFormik } from 'formik';
import PreFullScreenViewer from 'presentation/views/components/PreFullscreenViewer/PreFullScreenViewer';
import { loginDTO } from 'domain/repository/auth/structures/loginDTO';

const SignIn = () => {
    const intl = useIntl();

    const {
        authViewModel: {
            signInSubmitError,
            onClickSignIn,
            isSignInSubmissionErrorVisible,
            validateSignInForm,
            signinInitFields,
        },
    } = useViewModels();

    const form = useFormik({
        initialValues: signinInitFields,
        validateOnBlur: false,
        validateOnChange: false,
        validate: validateSignInForm,
        onSubmit: (values: loginDTO, { setErrors }) => {
            onClickSignIn(values).catch((errors) => {
                setErrors(errors);
            });
        },
    });

    return (
        <>
            <Typography
                component="h2"
                variant="h4"
                dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({ id: 'auth.signin.signIn' }),
                }}
            ></Typography>
            <PreFullScreenViewer content={<pre>{JSON.stringify(form.values, null, 6)}</pre>} />
            <FormikProvider value={form}>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <FastField
                        name="email"
                        children={(fieldProps: any) => (
                            <TextField
                                {...fieldProps.field}
                                required
                                fullWidth
                                label={
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: intl.formatMessage({
                                                id: 'auth.signin.email',
                                            }),
                                        }}
                                    ></span>
                                }
                                variant="standard"
                                error={!form.isValid ? Boolean(fieldProps.meta.error) : undefined}
                                helperText={!form.isValid && fieldProps.meta.error}
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
                                label={
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: intl.formatMessage({
                                                id: 'auth.signin.password',
                                            }),
                                        }}
                                    ></span>
                                }
                                type="password"
                                variant="standard"
                                error={!form.isValid ? Boolean(fieldProps.meta.error) : undefined}
                                helperText={!form.isValid && fieldProps.meta.error}
                            />
                        )}
                    />

                    {isSignInSubmissionErrorVisible && (
                        <Typography variant="overline" color="error">
                            {signInSubmitError}
                        </Typography>
                    )}

                    <Button
                        onClick={() => {
                            form.handleSubmit();
                        }}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: intl.formatMessage({
                                    id: 'app.header.signIn',
                                }),
                            }}
                        ></span>
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Typography variant="label" color="error">
                                <Link
                                    to={NonAuthPaths.forgotPassword}
                                    dangerouslySetInnerHTML={{
                                        __html: intl.formatMessage({
                                            id: 'auth.signin.forgotPassword',
                                        }),
                                    }}
                                ></Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="label" color="error">
                                <Link
                                    to={NonAuthPaths.signup}
                                    dangerouslySetInnerHTML={{
                                        __html: intl.formatMessage({
                                            id: 'auth.signin.createAccount',
                                        }),
                                    }}
                                ></Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </FormikProvider>
        </>
    );
};

export default SignIn;
