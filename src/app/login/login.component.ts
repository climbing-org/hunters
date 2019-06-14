import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginForm, SecurityService } from '../shared/services/security.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JWTHelper } from '../shared/helpers/jwt.helper';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    loginInProgress = false;
    showerror = false;

    private loginObserver = {
        next: (res) => {
            // const session = this.ss.getSession();
            // if (!session) { return; }

            if (res && res.code !== 0) {
                this.showerror = true;
                return;
            }

            if (!res && !res.data) { return; }
            JWTHelper.setToken(res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            const redirectURL = '/admin/static-page-table';

            this.router.navigateByUrl(redirectURL);
        },
        error: () => this.showerror = true,
        complete: () => this.loginInProgress = false
    };

    constructor(
      public router: Router,
      private ss: SecurityService
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            email   : new FormControl('', Validators.email),
            password: new FormControl('', Validators.required)
        });

        const session = this.ss.getSessionObject();
        if (session) {
            this.router.navigateByUrl(`/admin`);
        }
    }

    submit({value, valid}: { value: LoginForm, valid: boolean }) {
        // localStorage.setItem('isLoggedin', 'true');
        if (!valid) {
            this.showerror = true;
            return;
        }
        this.loginInProgress = true;
        this.ss.login(value).subscribe(this.loginObserver);
    }
}
