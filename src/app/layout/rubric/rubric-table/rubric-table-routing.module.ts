import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RubricTableComponent } from './rubric-table.component';

const routes: Routes = [{
    path: '',
    component: RubricTableComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RubricTableRoutingModule { }
