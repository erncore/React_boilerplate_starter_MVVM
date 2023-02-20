import React, { ReactNode } from 'react';
import st from './simplePopup.module.scss';

interface SimplePopupProps {
    popupIsOpen: boolean;
    popupIsVisible: boolean;
    children: ReactNode;
}

export const SimplePopup: React.FC<SimplePopupProps> = ({ popupIsOpen, popupIsVisible, children }) => {
    return (
        <div
            className={`${st.simple_popup}
            ${popupIsOpen ? st.simple_popup_active : ''}
            ${popupIsVisible ? st.simple_popup_visible : ''}
        `}
        >
            {children}
        </div>
    );
};
