// This example shows the particular variation of routing syntax
// needed to work with the CLI lazy loading support. The syntax can be
// slightly different if you are using a different tooling approach.

import { ExtraOptions, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'hr', pathMatch: 'full' },
  {
    path: 'hr',
    loadComponent: () =>
      import('./hr-files/hr-files-search.component')
  },
  {
    path: 'payroll',
    loadComponent: () => import('./payroll/payroll-search.component')
  }
];

export const config: ExtraOptions = {
  useHash: true,
  enableTracing: false, // Turn this on to log routing events to the console
  scrollPositionRestoration: 'enabled'
  // ,preloadingStrategy: PreloadAllModules
};
