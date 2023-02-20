enum UserRoles {
    manager = 'manager',
    guest = 'guest',
}

type ValidationResult = {
    errors: Object;
    isValid?: boolean;
};

type SubmissionFailedResult = {
    errors: Object;
    errorDescription: string | null;
    // isValid: Boolean;
};

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        circle: true;
    }
}

declare module '@mui/material/styles' {
    interface PaletteColor {
        light1?: string;
        light2?: string;
    }
    interface SimplePaletteColorOptions {
        light1?: string;
        light2?: string;
    }
}

declare module '@mui/material/styles' {
    interface TypographyVariants {
        t2: React.CSSProperties;
        t2news: React.CSSProperties;
        t3: React.CSSProperties;
        t3s: React.CSSProperties;
        t4: React.CSSProperties;
        d1: React.CSSProperties;
        d1s: React.CSSProperties;
        d2: React.CSSProperties;
        d3: React.CSSProperties;
        p5: React.CSSProperties;
        button: React.CSSProperties;
        inputText: React.CSSProperties;
        helpertext: React.CSSProperties;
        label: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        t2: React.CSSProperties;
        t2news: React.CSSProperties;
        t3: React.CSSProperties;
        t3s: React.CSSProperties;
        t4: React.CSSProperties;
        d1: React.CSSProperties;
        d1s: React.CSSProperties;
        d2: React.CSSProperties;
        d3: React.CSSProperties;
        p5: React.CSSProperties;
        button: React.CSSProperties;
        inputText: React.CSSProperties;
        helpertext: React.CSSProperties;
        label: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        t2: true;
        t2news: true;
        t3: true;
        t3s: true;
        t4: true;
        d1: true;
        d1s: true;
        d2: true;
        d3: true;
        p5: true;
        button: true;
        inputText: true;
        helpertext: true;
        label: true;
    }
}

export { UserRoles };
export type { ValidationResult, SubmissionFailedResult };
