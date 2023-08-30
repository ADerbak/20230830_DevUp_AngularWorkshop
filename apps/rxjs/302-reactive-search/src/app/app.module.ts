import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { AppComponent } from './app.component';
import { RedditSearchComponent } from './reddit-search/reddit-search.component';

@NgModule({
  declarations: [AppComponent, RedditSearchComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HeaderModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
