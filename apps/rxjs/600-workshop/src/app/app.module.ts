import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '@class-materials/shared/ui-page-header';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    HeaderModule,
    RouterModule.forRoot([
      {
        path: 'players',
        loadChildren: () =>
          import('./player/player.module').then(m => m.PlayerModule)
      },
      {
        path: 'games',
        loadChildren: () =>
          import('./game/game.module').then(m => m.GameModule)
      }
    ]),
    HttpClientModule,
    MatListModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
