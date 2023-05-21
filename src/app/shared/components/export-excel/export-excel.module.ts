import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportExcelComponent } from './export-excel.component';
import { MaterialModule } from '../../../modules/material.module';

@NgModule({
  declarations: [ExportExcelComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ExportExcelComponent]
})
export class ExportExcelModule { }
