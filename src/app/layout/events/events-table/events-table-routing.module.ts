import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsTableComponent } from './events-table.component';

const routes: Routes = [{
    path: '',
    component: EventsTableComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsTableRoutingModule { }
