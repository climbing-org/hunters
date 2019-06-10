import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuTableRoutingModule } from './menu-table-routing.module';
import { MenuTableComponent } from './menu-table.component';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../../shared/services/menu.service';
import { PageHeaderModule } from '../../../shared/modules';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '../../../shared/interceptors/default.interceptor';

@NgModule({
  declarations: [MenuTableComponent],
  imports: [
    CommonModule,
    MenuTableRoutingModule,
      FormsModule,
      PageHeaderModule,
      DragDropModule
  ],
    providers: [
        MenuService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DefaultInterceptor,
            multi: true
        },
    ]
})
export class MenuTableModule { }
