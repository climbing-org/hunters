import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RubricPageRoutingModule } from './rubric-page-routing.module';
import { RubricPageComponent } from './rubric-page.component';
import { RubricService } from '../../../shared/services/rubric.service';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';

@NgModule({
  declarations: [RubricPageComponent],
  imports: [
    CommonModule,
      FormsModule,
      NgbAlertModule,
    RubricPageRoutingModule
  ], providers: [
        RubricService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ]
})
export class RubricPageModule { }
