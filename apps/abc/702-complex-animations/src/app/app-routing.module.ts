import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'employee-processing', pathMatch: 'full' },
  {
    path: 'employee-processing',
    loadChildren: () =>
      import('./employee-processing/employee.module').then(
        m => m.EmployeeModule
      ),
    data: { name: 'EmployeeProcessing' }
  },
  {
    path: 'fluid-cms',
    loadChildren: () =>
      import('./fluid-cms/fluid-cms.module').then(
        m => m.CmsFluidModule
      ),
    data: { name: 'FluidCMS' }
  },
  {
    path: 'static-cms',
    loadChildren: () =>
      import('./static-cms/static-cms.module').then(
        m => m.CmsStaticModule
      ),
    data: { name: 'StaticCMS' }
  },
  {
    path: 'silicon-wafers',
    loadChildren: () =>
      import('./silicon-wafers/silicon-wafers.module').then(
        m => m.SiliconWafersModule
      ),
    data: { name: 'SiliconWafers' }
  }
];

const config: ExtraOptions = {
  useHash: true,
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
