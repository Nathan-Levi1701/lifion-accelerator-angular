import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormClientComponent } from '~/components/forms/form-client/form-client.component';
import { NavBarSectionComponent } from '~/components/navbars/navbar-section/navbar-section.component';
import { TableClientComponent } from '~/components/table-client/table-client.component';
import { LayoutClientsComponent } from '~/layouts/layout-clients/layout-clients.component';

const routes: Routes = [
    {
        path: '', title: 'Lifion Accelerator | Clients', component: LayoutClientsComponent,
        data: { title: 'Client Management', heading: 'Active Clients' },
        children: [
            { path: '', component: NavBarSectionComponent, outlet: 'navbar' },
            { path: '', component: TableClientComponent, outlet: 'table' }
        ],
    },
    {
        path: 'new', title: 'Lifion Accelerator | Clients', component: LayoutClientsComponent,
        data: { title: 'Client Management', heading: 'Create New Client' },
        children: [
            { path: '', component: NavBarSectionComponent, outlet: 'navbar' },
            { path: '', component: FormClientComponent, outlet: 'form' }
        ],
    },
    {
        path: 'edit/:id', title: 'Lifion Accelerator | Clients', component: LayoutClientsComponent,
        data: { title: 'Client Management', heading: 'Edit Client' },
        children: [
            { path: '', component: NavBarSectionComponent, outlet: 'navbar' },
            { path: '', component: FormClientComponent, outlet: 'form' }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientsRoutingModule { }
