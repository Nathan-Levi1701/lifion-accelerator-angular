import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutOneModule } from '~/layouts/layout-one/layout-one.module';
import { ClientRoutingModule } from './client-routing.module';
import { NavBarSectionModule } from '~/components/navbar-section/navbar-section.module';
import { HeaderSectionModule } from '~/components/header-section/header-section.module';
import { ContentSectionModule } from '~/components/content-section/content-section.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarSectionModule,
    LayoutOneModule,
    HeaderSectionModule,
    ContentSectionModule,
    ClientRoutingModule,
  ]
})

export class ClientModule { }
