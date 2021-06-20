import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';

import { PolicyComponent } from './policy/policy.component';
import { PoliciesRoutingModule } from './policies-routing.module';
import { PoliciesComponent } from './policies.component';
import { SharedModule } from 'src/app/shared/shared.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [PolicyComponent, PoliciesComponent],
  imports: [
    CommonModule,
    PoliciesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
})
export class PoliciesModule {}
