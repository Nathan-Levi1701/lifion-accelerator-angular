import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { MaterialModule } from '../../../../modules/material.module';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [LoaderComponent]
})
export class LoaderModule { }
