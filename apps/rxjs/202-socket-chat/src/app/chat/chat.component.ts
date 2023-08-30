import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { ChatService } from '../chat.service';
import { Message } from '../types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  name = new FormControl('', { nonNullable: true });
  message = new FormControl('', { nonNullable: true });
  allMessages: Observable<Message[]>;

  constructor(private chat: ChatService) {
    this.allMessages = chat.messages;
  }

  sendChat() {
    this.chat.sendChat({
      name: this.name.value,
      contents: this.message.value
    });
    this.message.reset();
  }
}
