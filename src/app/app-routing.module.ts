import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateHomeComponent } from '~/templates/template-home/template-home.component';

const routes: Routes = [
  { path: '', component: TemplateHomeComponent },
  { path: 'view', loadChildren: () => import('./modules/view/view.module').then(m => m.ViewModule) },
  { path: 'client', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule) },
  { path: 'section', loadChildren: () => import('./modules/section/section.module').then(m => m.SectionModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
