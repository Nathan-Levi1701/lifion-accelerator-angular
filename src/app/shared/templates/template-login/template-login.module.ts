import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateLoginComponent } from './template-login.component';
import { FormLoginModule } from '~/components/forms/form-login/form-login.module';

@NgModule({
  declarations: [TemplateLoginComponent],
  imports: [
    RouterModule,
    CommonModule,
    FormLoginModule
  ],
  exports: [TemplateLoginComponent]
})

export class TemplateLoginModule { }
