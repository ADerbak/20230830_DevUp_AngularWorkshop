import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app/app.component';

const config: SocketIoConfig = {
  url: 'http://localhost:8085',
  options: {}
};

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(SocketIoModule.forRoot(config))]
}).catch(err => console.error(err));
