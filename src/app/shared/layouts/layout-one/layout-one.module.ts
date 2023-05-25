import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutOneComponent } from './layout-one.component';
import { MaterialModule } from '../../../modules/material.module';
import { OverlayLoaderModule } from '~/components/overlay-loader/overlay-loader.module';

@NgModule({
  declarations: [LayoutOneComponent],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    OverlayLoaderModule
  ],
  exports: [LayoutOneComponent]
})

export class LayoutOneModule { }
