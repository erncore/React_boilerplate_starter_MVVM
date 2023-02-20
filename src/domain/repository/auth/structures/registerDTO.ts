type RegistrationResultDTO = {
    userType: string;
    email: string;
    plainPassword: string;
    facebookId: string;
    googleId: string;
};

type registerDTO = {
    type: string;
    email: string;
    password: string;
    confirm_password: string;
};

export type { RegistrationResultDTO, registerDTO };
