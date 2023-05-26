import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShortCutComponent } from './card-shortcut.component';
import { MaterialModule } from '../../../../modules/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardShortCutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [CardShortCutComponent]
})
export class CardShortCutModule { }
