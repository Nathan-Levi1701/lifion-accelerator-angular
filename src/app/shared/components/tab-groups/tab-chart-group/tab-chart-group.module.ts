import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabChartGroupComponent } from './tab-chart-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../modules/material.module';
import { OrganizationChartModule } from '../../organization-chart/organization-chart.module';
import { TitleCaseExtendedPipe } from '~/pipes/titlecase-extended.pipe';

@NgModule({
  declarations: [TabChartGroupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    OrganizationChartModule
  ],
  providers: [
    TitleCaseExtendedPipe
  ],
  exports: [TabChartGroupComponent]
})
export class TabChartGroupModule { }
