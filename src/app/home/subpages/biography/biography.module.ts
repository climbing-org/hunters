import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiographyRoutingModule } from './biography-routing.module';
import { BiographyComponent } from './biography.component';
import { HomeModule } from '../../home.module';

@NgModule({
  declarations: [BiographyComponent],
  imports: [
    CommonModule,
    BiographyRoutingModule,
      HomeModule
  ]
})
export class BiographyModule { }
