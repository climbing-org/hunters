import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard, PageHeaderModule } from './../../../shared';
import { FormsModule } from '@angular/forms';
import { NewsPageComponent } from './news-page.component';
import { NewsPageRoutingModule } from './news-page-routing.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MenuService } from '../../../shared/services/menu.service';
import { UploadService } from '../../../shared/services/upload.service';
import { NewsService } from '../../../shared/services/news.service';
import { UsersService } from '../../../shared/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';

@NgModule({
    imports: [CommonModule, NewsPageRoutingModule, PageHeaderModule, FormsModule, EditorModule],
    declarations: [NewsPageComponent],
    providers: [MenuService, NewsService, UploadService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },],
})
export class NewsPageModule {
}
