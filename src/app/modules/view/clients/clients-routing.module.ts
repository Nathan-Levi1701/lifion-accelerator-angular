import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '~/auth/auth.guard';
import { FormClientComponent } from '~/components/forms/form-client/form-client.component';
import { NavBarSectionComponent } from '~/components/navbars/navbar-section/navbar-section.component';
import { TableClientComponent } from '~/components/table-client/table-client.component';
import { LayoutClientsComponent } from '~/layouts/layout-clients/layout-clients.component';
import { TemplateMainComponent } from '~/templates/template-main/template-main.component';

const routes: Routes = [
    {
        path: '', title: 'Lifion Accelerator | Clients', component: TemplateMainComponent, canActivate: [AuthGuard], data: { title: 'Client Management' }, children: [
            {
                path: '', component: LayoutClientsComponent,
                data: { heading: 'Active Clients' },
                children: [
                    { path: '', component: NavBarSectionComponent, outlet: 'navbar' },
                    { path: '', component: TableClientComponent, outlet: 'table' }
                ],
            },
            {
                path: 'new', component: LayoutClientsComponent,
                data: { heading: 'Create New Client' },
                children: [
                    { path: '', component: NavBarSectionComponent, outlet: 'navbar' },
                    { path: '', component: FormClientComponent, outlet: 'form' }
                ],
            },
            {
                path: 'edit/:id', component: LayoutClientsComponent,
                data: { heading: 'Edit Client' },
                children: [
                    { path: '', component: NavBarSectionComponent, outlet: 'navbar' },
                    { path: '', component: FormClientComponent, outlet: 'form' }
                ],
            },
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class ClientsRoutingModule { }
