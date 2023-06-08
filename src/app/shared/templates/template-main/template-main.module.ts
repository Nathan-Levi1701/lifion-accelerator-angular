import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateMainComponent } from './template-main.component';
import { HeaderModule } from '~/components/header/header.module';
import { NavBarMainModule } from '~/components/navbars/navbar-main/navbar-main.module';
import { NavBarSectionModule } from '~/components/navbars/navbar-section/navbar-section.module';
import { MaterialModule } from '../../../modules/material.module';
import { DrawerContentModule } from '~/components/drawer-content/drawer-content.module';
import { FooterModule } from '~/components/footer/footer.module';
import { TemplateHomeModule } from '../template-home/template-home.module';
@NgModule({
  declarations: [TemplateMainComponent],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    HeaderModule,
    NavBarMainModule,
    NavBarSectionModule,
    DrawerContentModule,
    FooterModule,
    TemplateHomeModule
  ],
  exports: [TemplateMainComponent]
})

export class TemplateMainModule { }
