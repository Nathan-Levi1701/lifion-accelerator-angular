import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBlankComponent } from '~/layouts/layout-blank/layout-blank.component';
import { TemplateLoginComponent } from '~/templates/template-login/template-login.component';

const routes: Routes = [
    {
        path: '', title: 'Lifion Accelerator | Login', component: LayoutBlankComponent, children: [
            { path: '', component: TemplateLoginComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
