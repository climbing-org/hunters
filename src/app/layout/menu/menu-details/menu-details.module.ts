import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuDetailsRoutingModule } from './menu-details-routing.module';
import { MenuDetailsComponent } from './menu-details.component';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../../shared/services/menu.service';
import { StaticPageService } from '../../../shared/services/static-page.service';
import { UsersService } from '../../../shared/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MenuDetailsComponent],
  imports: [
    CommonModule,
    MenuDetailsRoutingModule,
      FormsModule,
      NgbAlertModule
  ],
    providers: [
        MenuService,
        StaticPageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ]
})
export class MenuDetailsModule { }
