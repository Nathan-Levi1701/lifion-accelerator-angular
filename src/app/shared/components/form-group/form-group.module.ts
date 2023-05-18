import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from './form-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/material.module';
import { FormInputModule } from '../form-input/form-input.module';


@NgModule({
  declarations: [FormGroupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormInputModule
  ],
  exports: [FormGroupComponent]
})
export class FormGroupModule { }
