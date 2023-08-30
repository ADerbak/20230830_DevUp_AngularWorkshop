import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { AppComponent } from './app.component';
import { TemperatureModule } from './temperature/temperature.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HeaderModule, TemperatureModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
