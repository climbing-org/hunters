import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard, PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';
import { NewStaticPageComponent } from './new-static-page.component';
import { NewStaticPageRoutingModule } from './new-static-page-routing.module';
import { MenuService } from '../../shared/services/menu.service';
import { StaticPageService } from '../../shared/services/static-page.service';
import { EditorModule } from '@tinymce/tinymce-angular';
import { UsersService } from '../../shared/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../shared/interceptors/default.interceptor';

@NgModule({
    imports: [CommonModule, NewStaticPageRoutingModule, PageHeaderModule, FormsModule, EditorModule],
    declarations: [NewStaticPageComponent],
    providers: [
        MenuService,
        StaticPageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ],
})
export class NewStaticPageModule {
}
