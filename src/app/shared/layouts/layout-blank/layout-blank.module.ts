import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutBlankComponent } from './layout-blank.component';

@NgModule({
  declarations: [LayoutBlankComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LayoutBlankComponent]
})

export class LayoutBlankModule { }
