import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EventsTableRoutingModule } from './events-table-routing.module';
import { EventsTableComponent } from './events-table.component';
import { EventService } from '../../../shared/services/event.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersService } from '../../../shared/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';

@NgModule({
    imports: [
        CommonModule,
        EventsTableRoutingModule,
        Ng2SmartTableModule
    ],
    declarations: [
        EventsTableComponent
    ],
    providers: [
        EventService,
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ],
})
export class EventsTableModule { }
