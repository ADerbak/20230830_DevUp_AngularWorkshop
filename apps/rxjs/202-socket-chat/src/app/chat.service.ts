import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { Message } from './types';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: Observable<Message[]>;

  constructor(private socket: Socket) {
    this.messages = socket.fromEvent('chat');
  }

  sendChat(message: Message) {
    this.socket.emit('chat', message, (x: unknown) =>
      console.log({ x })
    );
  }
}
