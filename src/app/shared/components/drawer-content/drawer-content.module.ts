import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerContentComponent } from './drawer-content.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../modules/material.module';

@NgModule({
  declarations: [DrawerContentComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    MaterialModule
  ],
  exports: [DrawerContentComponent]
})
export class DrawerContentModule { }
