import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuTableComponent } from './menu-table.component';

const routes: Routes = [{
    path: '',
    component: MenuTableComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuTableRoutingModule { }
