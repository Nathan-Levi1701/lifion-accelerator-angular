import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogChartComponent } from './dialog-chart.component';
import { MaterialModule } from '../../../../modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DialogChartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [DialogChartComponent]
})
export class DialogChartModule { }
