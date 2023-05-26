import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { MaterialModule } from '../../../../modules/material.module';

@NgModule({
  declarations: [DialogConfirmComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [DialogConfirmComponent]
})
export class DialogConfirmModule { }
