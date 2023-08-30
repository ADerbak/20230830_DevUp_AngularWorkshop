import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UIDisplayOrEditModule } from '@class-materials/shared/ui-display-or-edit';
import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HeaderModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    UIDisplayOrEditModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
