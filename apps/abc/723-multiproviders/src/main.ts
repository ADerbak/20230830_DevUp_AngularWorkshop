import {
  withInterceptorsFromDi,
  provideHttpClient
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { ConsoleLogHandler } from './app/loggers/console-log-handler';
import { LogHandler } from './app/loggers/log-handler';
import { LogService } from './app/loggers/log.service';
import { TelemetryLogHandler } from './app/loggers/telemetry-log-handler';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(ReactiveFormsModule),
    LogService,
    {
      provide: LogHandler,
      useClass: ConsoleLogHandler,
      multi: true
    },
    {
      provide: LogHandler,
      useClass: TelemetryLogHandler,
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch(err => console.error(err));
