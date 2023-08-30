import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Video } from '../dashboard.types';

// This component serves as a small example of
// a view component. In this case, the dashboard
// is acting as the corresponding smart component
@Component({
  selector: 'vst-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.scss'],
  standalone: true,
  imports: [NgFor]
})
export class TopListComponent {
  @Input() topList: Video[] = [];
  @Input() selectedVideo: Video | undefined;
  @Output() videoChanged = new EventEmitter<Video>();

  selectVideo(video: Video) {
    this.videoChanged.emit(video);
  }
}
