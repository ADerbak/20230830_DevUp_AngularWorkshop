import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'offline', pathMatch: 'full' },
  {
    path: 'offline',
    loadChildren: () =>
      import('./offline/offline.module').then(m => m.OfflineModule)
  },
  {
    path: 'singleplayer',
    loadChildren: () =>
      import('./single-player/single-player.module').then(
        m => m.SinglePlayerModule
      )
  },
  {
    path: 'multiplayer',
    loadChildren: () =>
      import('./multi-player/multi-player.module').then(
        m => m.MultiPlayerModule
      )
  }
];

const config: ExtraOptions = {
  useHash: true,
  enableTracing: false,
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
