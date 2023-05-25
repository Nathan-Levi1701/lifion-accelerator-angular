import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartGroupComponent } from './chart-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/material.module';
import { OrganizationChartModule } from '../organization-chart/organization-chart.module';

@NgModule({
  declarations: [ChartGroupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    OrganizationChartModule
  ],
  exports: [ChartGroupComponent]
})
export class ChartGroupModule { }
