import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutOneModule } from '~/layouts/layout-one/layout-one.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { NavBarSectionModule } from '~/components/navbar-section/navbar-section.module';
import { FormGroupModule } from '~/components/form-group/form-group.module';
import { LayoutBlankModule } from '~/layouts/layout-blank/layout-blank.module';
import { LayoutClientsModule } from '~/layouts/layout-clients/layout-clients.module';
import { FormClientModule } from '~/components/form-client/form-client.module';
import { TableClientModule } from '~/components/table-client/table-client.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarSectionModule,
    LayoutOneModule,
    LayoutBlankModule,
    LayoutClientsModule,
    LayoutClientsModule,
    FormGroupModule,
    ClientsRoutingModule,
    FormClientModule,
    TableClientModule
  ]
})

export class ClientsModule { }
