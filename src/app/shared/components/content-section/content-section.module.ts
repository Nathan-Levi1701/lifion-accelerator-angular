import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentSectionComponent } from './content-section.component';
import { MaterialModule } from '../../../modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TabChartGroupModule } from '~/components/tab-groups/tab-chart-group/tab-chart-group.module';
import { TabFormGroupModule } from '~/components/tab-groups/tab-form-group/tab-form-group.module';

@NgModule({
  declarations: [ContentSectionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TabFormGroupModule,
    ReactiveFormsModule,
    TabChartGroupModule
  ],
  exports: [ContentSectionComponent]
})
export class ContentSectionModule { }
