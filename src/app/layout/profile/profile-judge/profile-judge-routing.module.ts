import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileJudgeComponent } from './profile-judge.component';

const routes: Routes = [{
    path: '',
    component: ProfileJudgeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileJudgeRoutingModule { }
