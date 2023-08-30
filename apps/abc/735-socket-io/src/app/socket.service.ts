import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  message = new Observable<string>();

  constructor(socket: Socket) {
    this.message = socket.fromEvent('visitCount');
  }
}
