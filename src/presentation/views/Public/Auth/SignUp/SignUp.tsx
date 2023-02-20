import * as React from 'react';
import { useIntl } from 'react-intl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { NonAuthPaths } from 'presentation/routes/routes';
import { Link, useLocation } from 'react-router-dom';
import { useViewModels } from 'presentation/view-model/ViewModelProvider';
import { FastField, FormikProvider, useFormik } from 'formik';
import PreFullScreenViewer from 'presentation/views/components/PreFullscreenViewer/PreFullScreenViewer';

import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { registerDTO } from 'domain/repository/auth/structures/registerDTO';

const SignUp = () => {
    const intl = useIntl();

    const {
        authViewModel: {
            isSignUpSubmissionErrorVisible,
            signUpSubmitError,
            onClickSignUp,
            validateSignUpForm,
            successSignUpPopupIsActive,
            hideSuccessSignUpPopup,
            signupInitFields,
        },
    } = useViewModels();

    const form = useFormik({
        enableReinitialize: true,
        initialValues: signupInitFields,
        validate: validateSignUpForm,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values: registerDTO, { setErrors }) => {
            onClickSignUp(values).catch((errors) => {
                setErrors(errors);
            });
        },
    });
    return (
        <>
            <Typography
                component="h1"
                variant="h4"
                dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({ id: 'auth.signup.title' }),
                }}
            />
            <PreFullScreenViewer content={<pre>{JSON.stringify(form.errors, null, 6)}</pre>} />
            <FormikProvider value={form}>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                    onSubmit={form.handleSubmit}
                    onChange={(event: any) => {
                        if (form.errors) {
                            form.setFieldError(event.target.name, '');
                        }
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                                                        id: 'auth.signup.email',
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
                        </Grid>
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
                                        error={!form.isValid ? Boolean(fieldProps.meta.error) : undefined}
                                        helperText={!form.isValid && fieldProps.meta.error}
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
                                        type="password"
                                        label={
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: intl.formatMessage({
                                                        id: 'auth.signup.confirmPassword',
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
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox defaultChecked name="privacy" color="primary" />}
                                label={
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: intl.formatMessage({
                                                id: 'auth.signup.terms',
                                            }),
                                        }}
                                    ></span>
                                }
                            />
                        </Grid>
                    </Grid>
                    {isSignUpSubmissionErrorVisible && (
                        <Typography variant="overline" color="error">
                            {signUpSubmitError}
                        </Typography>
                    )}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: intl.formatMessage({
                                    id: 'auth.signup.button',
                                }),
                            }}
                        ></span>
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Typography variant="label" color="error">
                                <Link
                                    to={NonAuthPaths.signin}
                                    dangerouslySetInnerHTML={{
                                        __html: intl.formatMessage({
                                            id: 'auth.signup.registered',
                                        }),
                                    }}
                                ></Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </FormikProvider>
            <Dialog
                open={successSignUpPopupIsActive}
                onClose={hideSuccessSignUpPopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{ p: 3 }}>
                    <DialogTitle id="alert-dialog-title">Lorem ipsum dolor sit amet!</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero omnis quam excepturi?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to={NonAuthPaths.signin}>
                            <Button variant="contained" color="secondary" onClick={hideSuccessSignUpPopup} autoFocus>
                                Sign in
                            </Button>
                        </Link>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

export default observer(SignUp);
