import React from 'react';
import { FastField, FormikProvider, useFormik } from 'formik';

import PreFullScreenViewer from 'presentation/views/components/PreFullscreenViewer/PreFullScreenViewer';

// componets
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useViewModels } from 'presentation/view-model/ViewModelProvider';

const Security: React.FC = () => {
    const {
        authViewModel: {
            validateChangePasswordForm,
            onClickChangePassword,
            onClickDeleteAccount,
            validateDeleteAccountForm,
        },
    } = useViewModels();

    const form = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validate: validateChangePasswordForm,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values, { setErrors }) => {
            onClickChangePassword(values.currentPassword, values.newPassword, values.confirmNewPassword).catch(
                ({ errors }) => {
                    setErrors(errors);
                }
            );
        },
    });

    const deleteAccountForm = useFormik({
        initialValues: { currentPassword: '' },
        validate: validateDeleteAccountForm,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values, { setErrors }) => {
            onClickDeleteAccount(values.currentPassword).catch(({ errors }) => {
                setErrors(errors);
            });
        },
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Typography variant="h3" sx={{ mb: 12 }}>
                Security Settings
            </Typography>
            <PreFullScreenViewer content={<pre>{JSON.stringify(form.values, null, 6)}</pre>} />
            <FormikProvider value={form}>
                <Box
                    component="form"
                    noValidate
                    onSubmit={form.handleSubmit}
                    onChange={(event: any) => {
                        if (form.errors) {
                            form.setFieldError(event.target.name, '');
                        }
                    }}
                    sx={{ mt: 4 }}
                >
                    <Typography variant="h5" sx={{ mb: 4 }}>
                        Password
                    </Typography>
                    <Grid container spacing={4} sx={{ mb: 4 }}>
                        <Grid item xs={12}>
                            <FastField
                                name="currentPassword"
                                children={(fieldProps: any) => (
                                    <TextField
                                        {...fieldProps.field}
                                        required
                                        fullWidth
                                        type="password"
                                        label="Enter your current password"
                                        variant="standard"
                                        error={!form.isValid ? Boolean(fieldProps.meta.error) : undefined}
                                        helperText={!form.isValid && fieldProps.meta.error}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FastField
                                name="newPassword"
                                children={(fieldProps: any) => (
                                    <TextField
                                        {...fieldProps.field}
                                        required
                                        fullWidth
                                        type="password"
                                        label="New Password"
                                        variant="standard"
                                        error={!form.isValid ? Boolean(fieldProps.meta.error) : undefined}
                                        helperText={!form.isValid && fieldProps.meta.error}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FastField
                                name="confirmNewPassword"
                                children={(fieldProps: any) => (
                                    <TextField
                                        {...fieldProps.field}
                                        required
                                        fullWidth
                                        type="password"
                                        label="Confirm New Password"
                                        variant="standard"
                                        error={!form.isValid ? Boolean(fieldProps.meta.error) : undefined}
                                        helperText={!form.isValid && fieldProps.meta.error}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained">
                        Save Changes
                    </Button>
                    <Divider sx={{ mt: 8, mb: 8 }} />
                    <Typography variant="h4" gutterBottom>
                        Delete Account
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Deleting your account is permanent and will remove all content including appointments and
                        profile settings.
                    </Typography>
                    <Button type="button" variant="contained" color="error" onClick={handleClickOpen}>
                        Delete Account
                    </Button>
                </Box>
            </FormikProvider>

            <Dialog open={open} onClose={handleClose}>
                <FormikProvider value={deleteAccountForm}>
                    <Box component="form" noValidate onSubmit={deleteAccountForm.handleSubmit} sx={{ m: 2 }}>
                        <DialogTitle>Delete Account</DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{ mb: 2 }}>
                                Deleting your Account is permanent and will remove all content including appointments
                                and profile settings. Enter your Password to delete Account.
                            </DialogContentText>
                            <FastField
                                name="currentPassword"
                                children={(fieldProps: any) => (
                                    <TextField
                                        {...fieldProps.field}
                                        required
                                        fullWidth
                                        type="password"
                                        label="Enter your current password"
                                        variant="standard"
                                        error={!form.isValid ? Boolean(fieldProps.meta.error) : undefined}
                                        helperText={!form.isValid && fieldProps.meta.error}
                                    />
                                )}
                            />
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: 'space-between' }}>
                            <Button variant="contained" color="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="error" type="submit">
                                Delete Account
                            </Button>
                        </DialogActions>
                    </Box>
                </FormikProvider>
            </Dialog>
        </div>
    );
};

export default Security;
