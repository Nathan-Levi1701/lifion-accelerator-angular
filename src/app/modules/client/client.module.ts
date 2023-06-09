import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutOneModule } from '~/layouts/layout-one/layout-one.module';
import { ClientRoutingModule } from './client-routing.module';
import { NavBarSectionModule } from '~/components/navbars/navbar-section/navbar-section.module';
import { HeaderSectionModule } from '~/components/header-section/header-section.module';
import { ContentSectionModule } from '~/components/content-section/content-section.module';
import { TemplateMainModule } from '~/templates/template-main/template-main.module';
import { AuthGuard } from '~/auth/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarSectionModule,
    LayoutOneModule,
    HeaderSectionModule,
    ContentSectionModule,
    ClientRoutingModule,
    TemplateMainModule
  ],
  providers: [AuthGuard]
})

export class ClientModule { }
