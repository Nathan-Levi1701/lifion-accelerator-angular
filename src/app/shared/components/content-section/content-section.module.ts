import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentSectionComponent } from './content-section.component';
import { MaterialModule } from '../../../modules/material.module';
import { FormGroupModule } from '../form-group/form-group.module';
import { OrganizationChartModule } from '../organization-chart/organization-chart.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContentSectionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormGroupModule,
    ReactiveFormsModule,
    OrganizationChartModule
  ],
  exports: [ContentSectionComponent]
})
export class ContentSectionModule { }
