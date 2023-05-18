import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutOneModule } from '~/layouts/LayoutOne/layout-one.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { NavBarModule } from '~/components/navbar/navbar.module';
import { FormGroupModule } from '~/components/form-group/form-group.module';
import { LayoutBlankModule } from '~/layouts/layout-blank/layout-blank.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarModule,
    LayoutOneModule,
    LayoutBlankModule,
    FormGroupModule,
    ClientsRoutingModule
  ]
})

export class ClientsModule { }
