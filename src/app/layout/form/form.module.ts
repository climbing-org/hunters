import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../shared/services/menu.service';
import { StaticPageService } from '../../shared/services/static-page.service';

@NgModule({
    imports: [CommonModule, FormRoutingModule, PageHeaderModule, FormsModule],
    declarations: [FormComponent],
    providers   : [
        MenuService,
        StaticPageService
    ],
})
export class FormModule {}
