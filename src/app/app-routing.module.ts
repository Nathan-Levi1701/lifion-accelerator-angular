import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateHomeComponent } from '~/templates/template-home/template-home.component';
import { TemplateMainComponent } from '~/templates/template-main/template-main.component';

const routes: Routes = [
  { path: '', component: TemplateMainComponent, children: [{ path: '', component: TemplateHomeComponent }] },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'view', loadChildren: () => import('./modules/view/view.module').then(m => m.ViewModule) },
  { path: 'client', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
