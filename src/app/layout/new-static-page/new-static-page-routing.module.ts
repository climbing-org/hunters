import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewStaticPageComponent } from './new-static-page.component';

const routes: Routes = [
    {
        path: '', component: NewStaticPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewStaticPageRoutingModule {
}
