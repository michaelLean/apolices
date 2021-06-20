import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './components/main/main.component';
import { CoreRoutingModule } from './core-routing.module';
import { ClientsModule } from '../pages/clients/clients.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, CoreRoutingModule, ClientsModule, HttpClientModule],
  exports: [MainComponent],
})
export class CoreModule {}
