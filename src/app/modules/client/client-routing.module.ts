import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentSectionComponent } from '~/components/content-section/content-section.component';
import { HeaderSectionComponent } from '~/components/header-section/header-section.component';
import { NavBarComponent } from '~/components/navbar/navbar.component';
import { LayoutOneComponent } from '~/layouts/layout-one/layout-one.component';

const routes: Routes = [
    {
        path: ':clientId/:tab/:section', title: 'Lifion Accelerator | Onboard', component: LayoutOneComponent,
        children: [
            { path: '', component: NavBarComponent, outlet: 'navbar' },
            { path: '', component: HeaderSectionComponent, outlet: 'header' },
            { path: '', component: ContentSectionComponent, outlet: 'content' }

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
