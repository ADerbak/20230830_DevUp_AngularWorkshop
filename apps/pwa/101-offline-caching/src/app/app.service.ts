import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  instructors = this.httpClient.get<Instructor[]>(
    apiUrl + '/instructors'
  );
  constructor(private httpClient: HttpClient) {}
}
