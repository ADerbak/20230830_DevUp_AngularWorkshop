import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClickComponent } from '../click/click.component';
import { ClickService } from '../click.service';

import { SinglePlayerService } from './single-player.service';

const routes: Routes = [{ path: '', component: ClickComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  providers: [
    {
      provide: ClickService,
      useClass: SinglePlayerService
    }
  ]
})
export class SinglePlayerModule {}
