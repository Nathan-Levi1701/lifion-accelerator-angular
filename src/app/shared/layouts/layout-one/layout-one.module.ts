import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutOneComponent } from './layout-one.component';
import { MaterialModule } from '../../../modules/material.module';

@NgModule({
  declarations: [LayoutOneComponent],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule
  ],
  exports: [LayoutOneComponent]
})

export class LayoutOneModule { }
