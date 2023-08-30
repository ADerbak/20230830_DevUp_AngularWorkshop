import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClickComponent } from '../click/click.component';
import { ClickService } from '../click.service';

import { OfflineService } from './offline.service';

const routes: Routes = [{ path: '', component: ClickComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    {
      provide: ClickService,
      useClass: OfflineService
    }
  ]
})
export class OfflineModule {}
