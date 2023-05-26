import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationChartComponent } from './organization-chart.component';
import { MaterialModule } from '../../../modules/material.module';
import { DialogChartModule } from '../dialog-chart/dialog-chart.module';
import { DialogConfirmModule } from '../dialog-confirm/dialog-confirm.module';
import { DialogAddModule } from '../dialog-add/dialog-add.module';

@NgModule({
  declarations: [OrganizationChartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DialogChartModule,
    DialogConfirmModule,
    DialogAddModule
  ],
  exports: [OrganizationChartComponent]
})
export class OrganizationChartModule { }
