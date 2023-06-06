import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAddComponent } from './dialog-add.component';
import { MaterialModule } from '../../../../modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleCaseExtendedPipe } from '~/pipes/titlecase-extended.pipe';

@NgModule({
  declarations: [DialogAddComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    TitleCaseExtendedPipe
  ],
  exports: [DialogAddComponent]
})
export class DialogAddModule { }
