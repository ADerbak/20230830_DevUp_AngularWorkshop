import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { shareReplay } from 'rxjs';

import { ClickService } from '../click.service';

@Injectable()
export class MultiPlayerService implements ClickService {
  readonly clickCount = this.socket
    .fromEvent<number>('count')
    .pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  constructor(private socket: Socket) {
    console.log('Multi-Player Service Activated');
  }

  async increment() {
    this.socket.emit('increment');
  }
}
