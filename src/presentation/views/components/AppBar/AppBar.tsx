// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import st from './appBar.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { AuthRoutes, NonAuthPaths, NonAuthRoutes } from 'presentation/routes/routes';
import { useViewModels } from '../../../view-model/ViewModelProvider';
import { observer } from 'mobx-react';

import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';

interface appBarProps {
    bgColor?: string;
    className?: string;
    staticBarIsTransparent?: boolean;
}

export const AppBar: React.FC<appBarProps> = observer(({ bgColor = '#000', className, staticBarIsTransparent }) => {
    const intl = useIntl();
    const [selectLocale, setSelectLocale] = useState(false);
    const [showFixedBar, setShowFixedBar] = useState(false);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setSelectLocale(false);
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event?.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const {
        uIViewModel: { mobileMenuIsOpen, openMobileMenu, closeMobileMenu },
        authViewModel: { isUserAuthorized, onClickSignOut },
        userViewModel,
    } = useViewModels();

    useEffect(() => {
        let lastScrollTop = 0;

        const onScroll = () => {
            const scrollTop = window.scrollY;

            setShowFixedBar(scrollTop <= lastScrollTop);

            const appBarElement = document.querySelector('.app-bar');

            if (scrollTop <= lastScrollTop) {
                setShowFixedBar(true);

                if (appBarElement) {
                    // @ts-ignore
                    document.querySelector('.app-bar').style.position = 'fixed';
                }
            } else {
                setShowFixedBar(false);

                if (appBarElement) {
                    setTimeout(function () {
                        // @ts-ignore
                        appBarElement.style.position = 'absolute';
                    }, 100);
                }
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

            if (lastScrollTop === 0) {
                setShowFixedBar(false);
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div
            className={classNames(
                'app-bar',
                st.app_bar,
                showFixedBar ? st.fixed_bar : '',
                mobileMenuIsOpen ? st.app_bar_active : '',
                className
            )}
            style={{
                backgroundColor: showFixedBar || !staticBarIsTransparent ? bgColor : 'transparent',
            }}
        >
            <div className={st.container}>
                <div className={st.logo}>
                    <Link to={NonAuthRoutes.home}>logo</Link>
                </div>

                <div className={st.menu}>
                    <Link
                        to={NonAuthRoutes.home}
                        dangerouslySetInnerHTML={{
                            __html: 'home',
                        }}
                    ></Link>
                </div>

                <div className={st.settings}>
                    <div className={`${st.locale} ${selectLocale ? st.locale_active : ''}`}>
                        <div className={st.locale__switcher} onClick={() => setSelectLocale(!selectLocale)}>
                            <div>{userViewModel.locale}</div>
                        </div>

                        <div className={st.locale__list}>
                            <div
                                className={st.locale__list_item}
                                onClick={() => {
                                    setSelectLocale(false);
                                    userViewModel.changeLocale(userViewModel.locale === 'de' ? 'en' : 'de');
                                }}
                            >
                                {/* <div className={st.select_locale__local_item}> */}
                                {userViewModel.locale === 'de' ? (
                                    <>
                                        <div>En</div>
                                    </>
                                ) : (
                                    <>
                                        <div>De</div>
                                    </>
                                )}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>

                    <div className={st.profile}>
                        {isUserAuthorized ? (
                            <div
                                className={st.profile_icon}
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-end"
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow {...TransitionProps}>
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList
                                                        autoFocusItem={open}
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                        onKeyDown={handleListKeyDown}
                                                        className={st.profile_menu}
                                                    >
                                                        <Link to={AuthRoutes.cabinet}></Link>

                                                        <MenuItem
                                                            onClick={() => {
                                                                onClickSignOut();
                                                                handleClose();
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: intl.formatMessage({
                                                                    id: 'app.header.logOut',
                                                                }),
                                                            }}
                                                        ></MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>
                        ) : (
                            <Link to={NonAuthPaths.signin} className={st.signIn_button}>
                                <Button className="btn btn-login" variant="contained">
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: intl.formatMessage({
                                                id: 'app.header.signIn',
                                            }),
                                        }}
                                    ></span>
                                </Button>
                            </Link>
                        )}
                    </div>

                    <div className={st.burger} onClick={openMobileMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <div className={`${st.mobile_menu} ${mobileMenuIsOpen ? st.mobile_menu_active : ''}`}>
                    <header className={st.mobile_menu__header}>
                        <div className={classNames(st.logo, st.mobile_menu__logo)}>
                            <Link onClick={closeMobileMenu} to={'/'}></Link>
                        </div>

                        <div className={st.mobile_menu__close} onClick={closeMobileMenu}>
                            <div></div>
                            <div></div>
                        </div>
                    </header>

                    <div className={st.mobile_menu__main}>
                        <Link
                            onClick={closeMobileMenu}
                            to={NonAuthRoutes.home}
                            dangerouslySetInnerHTML={{
                                __html: 'home',
                            }}
                        ></Link>

                        {isUserAuthorized ? (
                            <div
                                onClick={() => {
                                    onClickSignOut();
                                    handleClose();
                                    closeMobileMenu();
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: intl.formatMessage({
                                        id: 'app.header.logOut',
                                    }),
                                }}
                            ></div>
                        ) : (
                            <Link
                                onClick={closeMobileMenu}
                                to={NonAuthRoutes.signin}
                                dangerouslySetInnerHTML={{
                                    __html: intl.formatMessage({
                                        id: 'app.header.signIn',
                                    }),
                                }}
                            ></Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
