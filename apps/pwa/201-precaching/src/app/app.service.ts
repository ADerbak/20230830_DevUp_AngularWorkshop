import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

export interface Instructor {
  employeeName: string;
  avatar: string;
}

const apiUrl = '/api';

// Or connect to the hosted demo API (works from StackBlitz):
// const apiUrl = 'https://api.angularbootcamp.com';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  instructors = this.httpClient

    .get<Instructor[]>(apiUrl + '/instructors')
    .pipe(
      tap(instructors =>
        preloadImages(
          instructors.map(instructor => instructor.avatar)
        )
      )
    );
  constructor(private httpClient: HttpClient) {}
}

function preloadImages(imageUrls: string[]) {
  imageUrls.forEach(imgUrl => {
    const img = new Image();
    img.src = imgUrl;
  });
}
