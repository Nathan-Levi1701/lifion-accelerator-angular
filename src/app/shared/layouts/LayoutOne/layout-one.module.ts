import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutOneComponent } from './layout-one.component';

@NgModule({
  declarations: [LayoutOneComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [LayoutOneComponent]
})

export class LayoutOneModule { }
