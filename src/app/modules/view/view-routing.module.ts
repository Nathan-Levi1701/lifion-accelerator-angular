import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '~/auth/auth.guard';

const routes: Routes = [
    { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewRoutingModule { }
