import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { firstValueFrom } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  readonly publicKey =
    'BHszwbJVa33zuY84nInZiqWed7WTLUWj3waQLVCM8BV329c2Zj34LJ69YCZtka6-T6639PiMeX05icXTfUBmxE0';

  constructor(private http: HttpClient, private swPush: SwPush) {}

  registerForNotifications() {
    if (!this.swPush.isEnabled) {
      console.warn(
        'Cannot subscribe to notifications --' +
          ' Service workers are disabled or not supported by this browser.'
      );
      return;
    }
    this.swPush
      .requestSubscription({
        serverPublicKey: this.publicKey
      })
      .then(sub =>
        firstValueFrom(
          this.http.post(environment.serverUrl + '/register', sub)
        )
      )
      .catch(err =>
        console.error('Could not subscribe to notifications', err)
      );
  }
}
