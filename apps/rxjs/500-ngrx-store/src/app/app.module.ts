import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { AppComponent } from './app.component';
import { CounterDisplayComponent } from './counter-display.component';
import { AppState, reducers } from './state';

@NgModule({
  declarations: [AppComponent, CounterDisplayComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot<AppState>(reducers),
    HeaderModule,
    MatButtonModule,
    MatCardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
