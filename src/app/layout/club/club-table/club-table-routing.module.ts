import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClubTableComponent } from './club-table.component';

const routes: Routes = [{
    path: '',
    component: ClubTableComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubTableRoutingModule { }
