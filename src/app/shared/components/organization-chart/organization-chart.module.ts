import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationChartComponent } from './organization-chart.component';
import { MaterialModule } from '../../../modules/material.module';
import { DialogAddModule } from '../dialogs/dialog-add/dialog-add.module';
import { DialogChartModule } from '../dialogs/dialog-chart/dialog-chart.module';
import { DialogConfirmModule } from '../dialogs/dialog-confirm/dialog-confirm.module';

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
