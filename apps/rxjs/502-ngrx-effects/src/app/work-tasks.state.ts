import {
  createActionGroup,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props
} from '@ngrx/store';

import { generalActions } from './state';

export const workTaskActions = createActionGroup({
  source: 'Work Tasks',
  events: {
    'Set Work Task': props<{ task: string; complete: boolean }>(),
    'Work Tasks Received': props<{ tasks: WorkTaskState }>()
  }
});

export interface WorkTaskState {
  todoWork: string[];
  doneWork: string[];
}

const defaultWorkTaskState: WorkTaskState = {
  todoWork: [],
  doneWork: []
};

export const workTaskReducer = createReducer(
  defaultWorkTaskState,
  on(workTaskActions.setWorkTask, (state, action) =>
    setWorkTaskStatus(state, action.task, action.complete)
  ),
  on(generalActions.completeAllSuccess, state => ({
    doneWork: [...state.doneWork, ...state.todoWork],
    todoWork: []
  })),
  on(
    workTaskActions.workTasksReceived,
    (_state, action) => action.tasks
  )
);

function setWorkTaskStatus(
  currentState: WorkTaskState,
  task: string,
  complete: boolean
): WorkTaskState {
  const todoWork = currentState.todoWork.filter(x => x !== task);
  const doneWork = currentState.doneWork.filter(x => x !== task);
  if (complete) {
    todoWork.push(task);
  } else {
    doneWork.push(task);
  }
  return { todoWork, doneWork };
}

// defensive copy of the data coming out of the store
// createSelector will memoize (cache) the result, meaning it will
// give the same object until the state changes
const selectWorkTaskState =
  createFeatureSelector<WorkTaskState>('workTasks');

export const selectTodoWork = createSelector(
  selectWorkTaskState,
  state => [...state.todoWork]
);

export const selectDoneWork = createSelector(
  selectWorkTaskState,
  state => [...state.doneWork]
);
