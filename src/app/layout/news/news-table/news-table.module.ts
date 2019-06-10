import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NewsTableRoutingModule } from './news-table-routing.module';
import { NewsTableComponent } from './news-table.component';
import { NewsService } from '../../../shared/services/news.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';

@NgModule({
    imports: [
        CommonModule,
        NewsTableRoutingModule,
        Ng2SmartTableModule
    ],
      declarations: [
          NewsTableComponent
      ],
    providers: [
        NewsService,
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ],
})
export class NewsTableModule { }
