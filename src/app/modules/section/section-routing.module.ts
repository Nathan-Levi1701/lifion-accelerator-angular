import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBlankComponent } from '~/layouts/layout-blank/layout-blank.component';
import { FormGroupComponent } from '~/components/form-group/form-group.component';

const routes: Routes = [
    {
        path: '', title: 'Lifion Accelerator | Clients', component: LayoutBlankComponent, children: [
            { path: '', component: FormGroupComponent, outlet: 'form' }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SectionRoutingModule { }
