import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabFormGroupComponent } from './tab-form-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../modules/material.module';
import { FormInputModule } from '~/components/forms/form-input/form-input.module';
import { TabReviewModule } from '~/components/tab-review/tab-review.module';
import { TitleCaseExtendedPipe } from '~/pipes/titlecase-extended.pipe';
@NgModule({
  declarations: [TabFormGroupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormInputModule,
    TabReviewModule,
  ],
  providers: [
    TitleCaseExtendedPipe
  ],
  exports: [TabFormGroupComponent]
})
export class TabFormGroupModule { }
