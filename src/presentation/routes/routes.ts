enum AuthRoutes {
    cabinet = 'cabinet/*',
    dashboard = 'dashboard',
    notifications = 'notifications',
    profile = 'profile',
    account = 'account',
    security = 'security',
}

enum AuthPaths {
    cabinet = '/cabinet',
    dashboard = '/cabinet/dashboard',
    notifications = '/cabinet/notifications',
    profile = '/cabinet/profile',
    account = '/cabinet/account',
    security = '/cabinet/security',
}

enum NonAuthRoutes {
    home = '/',
    auth = 'auth/*',
    signin = 'signin',
    signup = 'signup',
    newPassword = 'new-password',
    forgotPassword = 'forgot-password',
    passwordReset = 'reset',
}

enum NonAuthPaths {
    home = '/',
    auth = '/auth/*',
    signin = '/auth/signin',
    signup = '/auth/signup',
    newPassword = '/auth/new-password',
    forgotPassword = '/auth/forgot-password',
    passwordReset = '/auth/reset',
}

export { AuthRoutes, NonAuthRoutes, NonAuthPaths, AuthPaths };
