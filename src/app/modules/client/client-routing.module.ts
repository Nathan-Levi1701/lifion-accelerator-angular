import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGroupComponent } from '~/components/form-group/form-group.component';
import { NavBarComponent } from '~/components/navbar/navbar.component';
import { LayoutOneComponent } from '~/layouts/layout-one/layout-one.component';

const routes: Routes = [
    {
        path: ':clientId/:tab/:section', title: 'Lifion Accelerator | Onboard', component: LayoutOneComponent,
        children: [
            { path: '', component: NavBarComponent, outlet: 'navbar' },
            { path: '', component: FormGroupComponent, outlet: 'form' }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
