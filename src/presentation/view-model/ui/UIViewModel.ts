import { action, makeAutoObservable } from 'mobx';

export default class UIViewModel {
    mobileMenuIsOpen = false;
    preloaderIsVisible = false;

    constructor() {
        makeAutoObservable(this);
    }

    // mobile menu
    @action openMobileMenu = () => {
        this.mobileMenuIsOpen = true;
    };

    @action closeMobileMenu = () => {
        this.mobileMenuIsOpen = false;
    };

    // preloader
    @action showPreloader = () => {
        this.preloaderIsVisible = true;
    };

    @action hidePreloader = () => {
        this.preloaderIsVisible = false;
    };
}
