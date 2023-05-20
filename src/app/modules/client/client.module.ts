import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutOneModule } from '~/layouts/layout-one/layout-one.module';
import { ClientRoutingModule } from './client-routing.module';
import { NavBarModule } from '~/components/navbar/navbar.module';
import { HeaderSectionModule } from '~/components/header-section/header-section.module';
import { ContentSectionModule } from '~/components/content-section/content-section.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarModule,
    LayoutOneModule,
    HeaderSectionModule,
    ContentSectionModule,
    ClientRoutingModule,
  ]
})

export class ClientModule { }
