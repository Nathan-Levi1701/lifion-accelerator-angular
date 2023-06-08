import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { HeaderModule } from '~/components/header/header.module';
import { NavBarSectionModule } from '~/components/navbars/navbar-section/navbar-section.module';
import { DrawerContentModule } from '~/components/drawer-content/drawer-content.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterModule } from '~/components/footer/footer.module';
import { NavBarMainModule } from '~/components/navbars/navbar-main/navbar-main.module';
import { TitleCaseExtendedPipe } from '~/pipes/titlecase-extended.pipe';
import { TemplateMainModule } from '~/templates/template-main/template-main.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments';
import { TemplateHomeModule } from '~/templates/template-home/template-home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    TemplateMainModule,
    HeaderModule,
    FooterModule,
    DrawerContentModule,
    MaterialModule,
    BrowserAnimationsModule,
    NavBarMainModule,
    NavBarSectionModule,
    TemplateHomeModule
  ],
  providers: [TitleCaseExtendedPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
