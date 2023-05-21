import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSectionComponent } from './header-section.component';
import { MaterialModule } from '../../../modules/material.module';
import { ExportExcelModule } from '../export-excel/export-excel.module';

@NgModule({
  declarations: [HeaderSectionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ExportExcelModule
  ],
  exports: [HeaderSectionComponent]
})
export class HeaderSectionModule { }
