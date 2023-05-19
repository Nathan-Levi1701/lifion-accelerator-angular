import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableClientComponent } from './table-client.component';
import { MaterialModule } from '../../../modules/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TableClientComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [TableClientComponent]
})
export class TableClientModule { }
