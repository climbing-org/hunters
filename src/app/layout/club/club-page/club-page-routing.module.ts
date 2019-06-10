import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClubPageComponent } from './club-page.component';

const routes: Routes = [{
    path: '',
    component: ClubPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubPageRoutingModule { }
