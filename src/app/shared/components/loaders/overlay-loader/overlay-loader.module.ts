import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayLoaderComponent } from './overlay-loader.component';
import { MaterialModule } from '../../../../modules/material.module';

@NgModule({
  declarations: [OverlayLoaderComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [OverlayLoaderComponent]
})
export class OverlayLoaderModule { }
