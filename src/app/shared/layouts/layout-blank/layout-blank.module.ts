import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutBlankComponent } from './layout-blank.component';
import { OverlayLoaderModule } from '~/components/overlay-loader/overlay-loader.module';

@NgModule({
  declarations: [LayoutBlankComponent],
  imports: [
    CommonModule,
    RouterModule,
    OverlayLoaderModule
  ],
  exports: [LayoutBlankComponent]
})

export class LayoutBlankModule { }
