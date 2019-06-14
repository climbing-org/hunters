import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RubricPageComponent } from './rubric-page.component';

const routes: Routes = [{
    path: '',
    component: RubricPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RubricPageRoutingModule { }
