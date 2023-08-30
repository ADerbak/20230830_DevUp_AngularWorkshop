import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HeaderModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
