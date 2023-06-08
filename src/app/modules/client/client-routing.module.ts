import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentSectionComponent } from '~/components/content-section/content-section.component';
import { HeaderSectionComponent } from '~/components/header-section/header-section.component';
import { NavBarSectionComponent } from '~/components/navbars/navbar-section/navbar-section.component';
import { LayoutOneComponent } from '~/layouts/layout-one/layout-one.component';
import { TemplateMainComponent } from '~/templates/template-main/template-main.component';

const routes: Routes = [
    {
        path: ':clientId/:tab/:section', title: 'Lifion Accelerator | Onboard', component: TemplateMainComponent, children: [
            {
                path: '', title: 'Lifion Accelerator | Onboard', component: LayoutOneComponent,
                children: [
                    { path: '', component: NavBarSectionComponent, outlet: 'navbar' },
                    { path: '', component: HeaderSectionComponent, outlet: 'header' },
                    { path: '', component: ContentSectionComponent, outlet: 'content' }
                ],
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
