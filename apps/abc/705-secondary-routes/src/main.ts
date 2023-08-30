import { bootstrapApplication } from '@angular/platform-browser';
import {
  withHashLocation,
  withInMemoryScrolling,
  provideRouter,
  Routes
} from '@angular/router';

import { AppComponent } from './app/app.component';
import { BlueBoxComponent } from './app/blue-box.component';
import { ChatComponent } from './app/chat.component';
import { HomeComponent } from './app/home.component';
import { NameComponent } from './app/name.component';
import { TaskComponent } from './app/task.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hello/:name', component: NameComponent },
  { path: 'blue', component: BlueBoxComponent },

  { path: 'chat', component: ChatComponent, outlet: 'side' },
  { path: 'task', component: TaskComponent, outlet: 'side' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    )
  ]
}).catch(err => console.error(err));
