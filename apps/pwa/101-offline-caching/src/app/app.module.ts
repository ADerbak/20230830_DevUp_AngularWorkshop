import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HeaderModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true
    }),
    HttpClientModule,
    MatButtonModule,
    MatCardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
