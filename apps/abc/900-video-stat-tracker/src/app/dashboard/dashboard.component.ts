import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardService } from './dashboard.service';
import { Video } from './dashboard.types';
import { TopListComponent } from './top-list/top-list.component';
import { VideoContainerComponent } from './video-container/video-container.component';
import { ViewsBreakdownComponent } from './views-breakdown/views-breakdown.component';
import { ViewsFilterComponent } from './views-filter/views-filter.component';

@Component({
  selector: 'vst-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    TopListComponent,
    VideoContainerComponent,
    ViewsBreakdownComponent,
    ViewsFilterComponent,
    AsyncPipe
  ]
})
export class DashboardComponent {
  videoList: Observable<Video[]>;
  selectedVideo: Observable<Video | undefined>;

  constructor(private ds: DashboardService) {
    this.videoList = ds.videoList;
    this.selectedVideo = ds.currentVideo;
  }

  videoChanged(video: Video) {
    this.ds.updateVideo(video);
  }
}
