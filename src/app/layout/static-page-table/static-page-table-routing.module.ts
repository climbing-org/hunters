import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticPageTableComponent } from './static-page-table.component';

const routes: Routes = [
    {
        path: '',
        component: StaticPageTableComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticPageTableRoutingModule { }
