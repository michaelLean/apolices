import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'policies',
  },
  {
    path: 'policies',
    loadChildren: () =>
      import('../pages/policies/policies.module').then((m) => m.PoliciesModule),
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('../pages/clients/clients.module').then((m) => m.ClientsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
