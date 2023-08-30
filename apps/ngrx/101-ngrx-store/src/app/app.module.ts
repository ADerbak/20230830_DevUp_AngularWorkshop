import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CounterDisplayComponent } from './counter-display.component';
import { AppState, reducers } from './state';

@NgModule({
  declarations: [AppComponent, CounterDisplayComponent],
  imports: [
    BrowserModule,
    HeaderModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    StoreModule.forRoot<AppState>(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
