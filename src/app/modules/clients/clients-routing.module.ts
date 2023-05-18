import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutOneComponent } from '~/layouts/LayoutOne/layout-one.component';
import { NavBarComponent } from '~/components/navbar/navbar.component';
import { LayoutBlankComponent } from '~/layouts/layout-blank/layout-blank.component';
import { FormGroupComponent } from '~/components/form-group/form-group.component';

const routes: Routes = [
    {
        path: '', title: 'Lifion Accelerator | Clients', data: { title: 'Clients', tabs: [{ name: 'Client Management', url: '/clients' }] },
        component: LayoutOneComponent, children: [
            { path: '', component: NavBarComponent, outlet: 'navbar' }
        ],
    },
    {
        path: ':id', title: 'Lifion Accelerator | Clients',
        component: LayoutOneComponent, children: [
            { path: '', component: NavBarComponent, outlet: 'navbar' },
        ],
    },
    {
        path: ':id/:section', title: 'Lifion Accelerator | Clients', component: LayoutBlankComponent, children: [
            { path: '', component: NavBarComponent, outlet: 'navbar' },
            { path: '', component: FormGroupComponent, outlet: 'form' }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientsRoutingModule { }
