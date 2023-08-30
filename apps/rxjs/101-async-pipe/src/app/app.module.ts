import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HeaderModule,
    HttpClientModule,
    MatCardModule,
    MatListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
