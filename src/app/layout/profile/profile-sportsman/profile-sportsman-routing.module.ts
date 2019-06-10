import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSportsmanComponent } from './profile-sportsman.component';

const routes: Routes = [{
    path: '',
    component: ProfileSportsmanComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileSportsmanRoutingModule { }
