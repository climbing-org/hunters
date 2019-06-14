import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RubricTableRoutingModule } from './rubric-table-routing.module';
import { RubricTableComponent } from './rubric-table.component';
import { RubricService } from '../../../shared/services/rubric.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [RubricTableComponent],
  imports: [
    CommonModule,
    RubricTableRoutingModule,
      Ng2SmartTableModule
  ],
    providers: [
        RubricService,
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ]
})
export class RubricTableModule { }
