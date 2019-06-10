import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuDetailsComponent } from './menu-details.component';

const routes: Routes = [{
    path: '',
    component: MenuDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuDetailsRoutingModule { }
