import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSportsmanRoutingModule } from './profile-sportsman-routing.module';
import { ProfileSportsmanComponent } from './profile-sportsman.component';
import { UserPageModule } from '../../../shared/components/user-page/user-page.module';
import { UsersService } from '../../../shared/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';

@NgModule({
  declarations: [ProfileSportsmanComponent],
  imports: [
    CommonModule,
    ProfileSportsmanRoutingModule,
      UserPageModule
  ], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },]
})
export class ProfileSportsmanModule { }
