import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private ss: SecurityService) {}

    canActivate() {
        // if (localStorage.getItem('isLoggedin')) {
        //     return true;
        // }
        //
        // this.router.navigate(['/login']);
        // return false;
        return new Promise<boolean>((resolve) => {
            // const s = this.ss.getSession();
            // if (s !== null) { resolve(true); }
            // else {
            //     this.router.navigate(['/login']);
            //     resolve(false);
            // }

            const t = this.ss.getToken();
            // console.log(t);
            // if (t !== null) { resolve(true); }
            if (t) { resolve(true); }
            else {
                this.router.navigate(['/login']);
                resolve(false);
            }
        });
    }
}
