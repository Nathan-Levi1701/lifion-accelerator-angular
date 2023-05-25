import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { HeaderModule } from '~/components/header/header.module';
import { NavBarSectionModule } from '~/components/navbar-section/navbar-section.module';
import { TemplateHomeModule } from '~/templates/template-home/template-home.module';
import { DrawerContentModule } from '~/components/drawer-content/drawer-content.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterModule } from '~/components/footer/footer.module';
import { NavBarMainModule } from '~/components/navbar-main/navbar-main.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateHomeModule,
    HeaderModule,
    FooterModule,
    DrawerContentModule,
    MaterialModule,
    BrowserAnimationsModule,
    NavBarMainModule,
    NavBarSectionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
