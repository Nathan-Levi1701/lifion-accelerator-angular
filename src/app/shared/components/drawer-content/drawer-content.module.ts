import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerContentComponent } from './drawer-content.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../modules/material.module';

@NgModule({
  declarations: [DrawerContentComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [DrawerContentComponent]
})
export class DrawerContentModule { }
