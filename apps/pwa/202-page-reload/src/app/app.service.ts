import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, first, interval, shareReplay, tap } from 'rxjs';

export interface Instructor {
  employeeName: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  available = this.swUpdate.available.pipe(
    tap(val => console.log('update!', val)),
    shareReplay(1)
  );

  constructor(
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef
  ) {
    this.subscribeToUpdates();
  }

  subscribeToUpdates() {
    if (this.swUpdate.isEnabled) {
      const isStable = this.appRef.isStable.pipe(
        first(stable => stable === true)
      );
      const updateInterval = interval(5 * 1000); // check every 30 seconds
      const updateOnceAppIsStable = concat(isStable, updateInterval);
      updateOnceAppIsStable
        .pipe(tap(() => console.log('checking for updates')))
        .subscribe(() => this.swUpdate.checkForUpdate());
    }
  }

  activateUpdate() {
    void this.swUpdate
      .activateUpdate()
      .then(() => document.location.reload());
  }
}
