import { Component } from '@angular/core';

import { MessageBodyComponent } from '../message-body/message-body.component';
import { MessageHeaderComponent } from '../message-header/message-header.component';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  standalone: true,
  imports: [MessageHeaderComponent, MessageBodyComponent]
})
export class MessageDisplayComponent {}
