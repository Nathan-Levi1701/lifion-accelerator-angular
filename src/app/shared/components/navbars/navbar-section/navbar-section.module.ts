import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarSectionComponent } from './navbar-section.component';
import { MaterialModule } from '../../../../modules/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavBarSectionComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [NavBarSectionComponent]
})
export class NavBarSectionModule { }
