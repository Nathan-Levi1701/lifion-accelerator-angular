import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionRoutingModule } from './section-routing.module';
import { NavBarModule } from '~/components/navbar/navbar.module';
import { LayoutBlankModule } from '~/layouts/layout-blank/layout-blank.module';
import { FormGroupModule } from '~/components/form-group/form-group.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarModule,
    LayoutBlankModule,
    FormGroupModule,
    SectionRoutingModule
  ]
})

export class SectionModule { }
