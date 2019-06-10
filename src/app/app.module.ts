import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { NbThemeModule } from '@nebular/theme';
import { SecurityService } from './shared/services/security.service';
import { DefaultInterceptor } from './shared/interceptors/default.interceptor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from 'ngx-toastr';

export function customBootstrap(
    securityService: SecurityService
) {
    return (): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            // Читаем сессию синхронно
            const session = securityService.onBootstrap();
        });
    };
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        NbThemeModule.forRoot(),
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot() // ToastrModule added
    ],
    declarations: [AppComponent],
    providers: [
        AuthGuard,
        SecurityService,
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: customBootstrap,
        //     multi: true,
        //     deps: [
        //         SecurityService,
        //     ],
        // },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
