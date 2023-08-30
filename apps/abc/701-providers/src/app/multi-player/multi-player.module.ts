import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { ClickComponent } from '../click/click.component';
import { ClickService } from '../click.service';

import { MultiPlayerService } from './multi-player.service';

const routes: Routes = [{ path: '', component: ClickComponent }];

const config: SocketIoConfig = {
  url: 'http://localhost:8085',
  options: {}
};

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {
      provide: ClickService,
      useClass: MultiPlayerService
    }
  ]
})
export class MultiPlayerModule {}
