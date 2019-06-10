import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserTableRoutingModule } from './user-table-routing.module';
import { UserTableComponent } from './user-table.component';
import { UsersService } from '../../../shared/services/user.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';

@NgModule({
  declarations: [UserTableComponent],
  imports: [
    CommonModule,
    UserTableRoutingModule,
    Ng2SmartTableModule
  ],
    providers: [
        UsersService,
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ]
})
export class UserTableModule { }
