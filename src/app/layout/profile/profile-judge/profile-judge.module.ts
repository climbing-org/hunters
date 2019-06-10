import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileJudgeComponent } from './profile-judge.component';
import { UserPageModule } from '../../../shared/components/user-page/user-page.module';
import { ProfileJudgeRoutingModule } from './profile-judge-routing.module';
import { UsersService } from '../../../shared/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';

@NgModule({
  declarations: [ProfileJudgeComponent],
  imports: [
    CommonModule,
    ProfileJudgeRoutingModule,
      UserPageModule
  ], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ]
})
export class ProfileJudgeModule { }
