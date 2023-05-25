import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentSectionComponent } from './content-section.component';
import { MaterialModule } from '../../../modules/material.module';
import { FormGroupModule } from '../form-group/form-group.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartGroupModule } from '../chart-group/chart-group.module';

@NgModule({
  declarations: [ContentSectionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormGroupModule,
    ReactiveFormsModule,
    ChartGroupModule
  ],
  exports: [ContentSectionComponent]
})
export class ContentSectionModule { }
