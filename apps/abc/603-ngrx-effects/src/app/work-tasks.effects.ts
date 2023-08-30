import { Injectable } from '@angular/core';
import {
  Actions,
  ROOT_EFFECTS_INIT,
  createEffect,
  ofType
} from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { WorkTask, WorkTaskLoader } from './work-task-loader.service';
import { workTaskActions } from './work-tasks.state';

function toTask(task: WorkTask) {
  return `${task.title}`;
}

@Injectable()
export class WorkTasksEffects {
  constructor(
    private actions$: Actions,
    private loader: WorkTaskLoader
  ) {}

  // ROOT_EFFECTS_INIT is a special action that is dispatched at the end of
  // NgRx's initialization process, so this effect executes at application
  // initialization.
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => this.loader.getList()),
      map(tasks =>
        workTaskActions.workTasksReceived({
          tasks: {
            doneWork: tasks.slice(0, 4).map(toTask),
            todoWork: tasks.slice(4, 6).map(toTask)
          }
        })
      )
    )
  );
}
