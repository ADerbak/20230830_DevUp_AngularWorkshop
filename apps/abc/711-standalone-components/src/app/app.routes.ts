import { ExtraOptions, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.routes')
  }
];

export const config: ExtraOptions = {
  useHash: true,
  scrollPositionRestoration: 'enabled'
};
