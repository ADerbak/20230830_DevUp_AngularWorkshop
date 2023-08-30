import { createFeature, createReducer, on } from '@ngrx/store';

import { taskApiActions, taskPageActions } from './tasks.actions';

const defaultTaskState: TaskState = {
  todo: [],
  done: []
};

export interface TaskState {
  todo: string[];
  done: string[];
}

export const tasksFeature = createFeature({
  name: 'tasks',
  reducer: createReducer(
    defaultTaskState,
    on(taskPageActions.taskCompleted, (state, action) =>
      setTaskStatus(state, action.task, true)
    ),
    on(taskPageActions.taskReset, (state, action) =>
      setTaskStatus(state, action.task, false)
    ),
    on(taskApiActions.tasksReceived, (_state, action) => action.tasks)
  )
});

function setTaskStatus(
  currentState: TaskState,
  task: string,
  markDone: boolean
): TaskState {
  const done = currentState.done.filter(x => x !== task);
  const todo = currentState.todo.filter(x => x !== task);
  if (markDone) {
    done.push(task);
  } else {
    todo.push(task);
  }
  return { todo, done };
}
