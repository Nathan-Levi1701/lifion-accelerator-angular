import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSectionComponent } from './header-section.component';
import { MaterialModule } from '../../../modules/material.module';

@NgModule({
  declarations: [HeaderSectionComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [HeaderSectionComponent]
})
export class HeaderSectionModule { }
