import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientsComponent } from './clients.component';
import { ClientComponent } from './client/client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [ClientsComponent, ClientComponent],
  imports: [
    CommonModule,
    SharedModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
})
export class ClientsModule {}
