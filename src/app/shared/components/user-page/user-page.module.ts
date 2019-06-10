import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageComponent } from './user-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule
  ],
    exports: [
        UserPageComponent
    ],
    providers: [
        UsersService,
        UploadService
    ]
})
export class UserPageModule { }
