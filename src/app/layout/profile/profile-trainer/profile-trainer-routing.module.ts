import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileTrainerComponent } from './profile-trainer.component';

const routes: Routes = [{
    path: '',
    component: ProfileTrainerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileTrainerRoutingModule { }
