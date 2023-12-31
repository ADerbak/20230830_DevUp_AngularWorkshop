import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { AppComponent } from './app.component';
import { PairHistoryComponent } from './pair-history/pair-history.component';
import { PairHistoryChartComponent } from './pair-history-chart/pair-history-chart.component';
import { PairHistoryViewComponent } from './pair-history-view/pair-history-view.component';
import { PairListComponent } from './pair-list/pair-list.component';
import { PairListViewComponent } from './pair-list-view/pair-list-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PairHistoryChartComponent,
    PairHistoryComponent,
    PairHistoryViewComponent,
    PairListComponent,
    PairListViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeaderModule,
    HttpClientModule,
    MatTableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
