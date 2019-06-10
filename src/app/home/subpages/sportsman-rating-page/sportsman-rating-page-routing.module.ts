import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SportsmanRatingPageComponent } from './sportsman-rating-page.component';

const routes: Routes = [{
    path: '',
    component: SportsmanRatingPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsmanRatingPageRoutingModule { }
