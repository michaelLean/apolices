import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyComponent } from './policy/policy.component';
import { PoliciesComponent } from './policies.component';

const routes: Routes = [
  {
    path: '',
    component: PoliciesComponent,
  },
  {
    path: 'new',
    component: PolicyComponent,
  },
  {
    path: ':id',
    component: PolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliciesRoutingModule {}
