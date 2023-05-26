import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabReviewComponent } from './tab-review.component';
import { MaterialModule } from '../../../modules/material.module';
import { FormInputModule } from '../forms/form-input/form-input.module';

@NgModule({
  declarations: [TabReviewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormInputModule
  ],
  exports: [TabReviewComponent]
})
export class TabReviewModule { }
