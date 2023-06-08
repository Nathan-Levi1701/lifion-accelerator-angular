import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutOneModule } from '~/layouts/layout-one/layout-one.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { NavBarSectionModule } from '~/components/navbars/navbar-section/navbar-section.module';
import { LayoutBlankModule } from '~/layouts/layout-blank/layout-blank.module';
import { LayoutClientsModule } from '~/layouts/layout-clients/layout-clients.module';
import { FormClientModule } from '~/components/forms/form-client/form-client.module';
import { TableClientModule } from '~/components/table-client/table-client.module';
import { TabFormGroupModule } from '~/components/tab-groups/tab-form-group/tab-form-group.module';
import { TemplateMainModule } from '~/templates/template-main/template-main.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarSectionModule,
    LayoutOneModule,
    LayoutBlankModule,
    LayoutClientsModule,
    LayoutClientsModule,
    TabFormGroupModule,
    ClientsRoutingModule,
    FormClientModule,
    TableClientModule,
    TemplateMainModule
  ]
})

export class ClientsModule { }
