import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    // Not currently taking advantage of any app level ngRx
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictStateSerializability: true,
          strictActionImmutability: true,
          strictActionSerializability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production
    }),
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('./soccer-team-stats.module').then(
            m => m.SoccerTeamStatsModule
          )
      }
    ]),
    HeaderModule,
    MatListModule,
    MatSidenavModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
