import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ClubTableRoutingModule } from './club-table-routing.module';
import { ClubTableComponent } from './club-table.component';
import { ClubService } from '../../../shared/services/club.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersService } from '../../../shared/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';

@NgModule({
  declarations: [ClubTableComponent],
  imports: [
    CommonModule,
    ClubTableRoutingModule,
      Ng2SmartTableModule
  ], providers: [
      ClubService,
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ]
})
export class ClubTableModule { }
