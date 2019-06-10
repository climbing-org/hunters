import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageModule } from '../../../shared/components/user-page/user-page.module';
import { ProfileTrainerComponent } from './profile-trainer.component';
import { ProfileTrainerRoutingModule } from './profile-trainer-routing.module';
import { UsersService } from '../../../shared/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';

@NgModule({
  declarations: [ProfileTrainerComponent],
  imports: [
    CommonModule,
    ProfileTrainerRoutingModule,
      UserPageModule
  ], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        }]
})
export class ProfileTrainerModule { }
