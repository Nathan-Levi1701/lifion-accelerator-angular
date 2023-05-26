import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateHomeComponent } from './template-home.component';
import { HeaderModule } from '~/components/header/header.module';
import { CardShortCutModule } from '~/components/cards/card-shortcut/card-shortcut.module';

@NgModule({
  declarations: [TemplateHomeComponent],
  imports: [
    RouterModule,
    CommonModule,
    HeaderModule,
    CardShortCutModule
  ],
  exports: [TemplateHomeComponent]
})

export class TemplateHomeModule { }
