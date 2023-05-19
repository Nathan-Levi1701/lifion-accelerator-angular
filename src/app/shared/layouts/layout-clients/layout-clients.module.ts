import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutClientsComponent } from './layout-clients.component';
import { TableClientModule } from '~/components/table-client/table-client.module';
import { FormClientModule } from '~/components/form-client/form-client.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/material.module';

@NgModule({
  declarations: [LayoutClientsComponent],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormClientModule,
    TableClientModule
  ],
  exports: [LayoutClientsComponent]
})

export class LayoutClientsModule { }
