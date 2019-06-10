import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageModule } from '../../../shared/components/user-page/user-page.module';
import { MyProfileComponent } from './my-profile.component';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { UsersService } from '../../../shared/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';

@NgModule({
  declarations: [MyProfileComponent],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
      UserPageModule
  ], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ]
})
export class MyProfileModule { }
