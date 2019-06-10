import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { StaticPageTableRoutingModule } from './static-page-table-routing.module';
import { StaticPageTableComponent } from './static-page-table.component';
import { StaticPageService } from '../../shared/services/static-page.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersService } from '../../shared/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../shared/interceptors/default.interceptor';

@NgModule({
    imports: [
        CommonModule,
        StaticPageTableRoutingModule,
        Ng2SmartTableModule
    ],
      declarations: [
          StaticPageTableComponent
      ],
    providers: [
        StaticPageService,
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ],
})
export class StaticPageTableModule { }
