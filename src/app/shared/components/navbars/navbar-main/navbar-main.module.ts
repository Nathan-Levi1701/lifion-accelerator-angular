import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarMainComponent } from './navbar-main.component';
import { MaterialModule } from '../../../../modules/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavBarMainComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [NavBarMainComponent]
})
export class NavBarMainModule { }
