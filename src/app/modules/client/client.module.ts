import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutOneModule } from '~/layouts/layout-one/layout-one.module';
import { ClientRoutingModule } from './client-routing.module';
import { NavBarModule } from '~/components/navbar/navbar.module';
import { FormGroupModule } from '~/components/form-group/form-group.module';
import { OrganizationChartModule } from '~/components/organization-chart/organization-chart.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarModule,
    LayoutOneModule,
    FormGroupModule,
    ClientRoutingModule,
    OrganizationChartModule,
  ]
})

export class ClientModule { }
