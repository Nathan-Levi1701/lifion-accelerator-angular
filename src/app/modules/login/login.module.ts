import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LayoutBlankModule } from '~/layouts/layout-blank/layout-blank.module';
import { TemplateLoginModule } from '~/templates/template-login/template-login.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LayoutBlankModule,
    TemplateLoginModule
  ]
})

export class LoginModule { }
