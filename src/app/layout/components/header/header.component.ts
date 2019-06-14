import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { JWTHelper } from '../../../shared/helpers/jwt.helper';
import User from '../../../shared/classes/user';
import { SecurityService } from '../../../shared/services/security.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    user: User;

    constructor(private translate: TranslateService,
                public router: Router,
                private ss: SecurityService) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.user = this.ss.getUser();
        console.log(this.user);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        JWTHelper.removeToken();
        localStorage.removeItem('user');
        const redirectURL = '/login';

        this.router.navigateByUrl(redirectURL);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
