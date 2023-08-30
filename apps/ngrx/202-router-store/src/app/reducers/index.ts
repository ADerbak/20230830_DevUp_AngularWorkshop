import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducerMap,
  createActionGroup,
  createFeature,
  createReducer,
  on,
  props
} from '@ngrx/store';

export const configActions = createActionGroup({
  source: 'Config',
  events: {
    'Update Title': props<{ title: string }>()
  }
});

export interface ConfigState {
  title: string;
}

const initialConfigState: ConfigState = {
  title: 'Our Blog'
};

export interface AppState {
  config: ConfigState;
  router: fromRouter.RouterReducerState;
}

const configFeature = createFeature({
  name: 'config',
  reducer: createReducer(
    initialConfigState,
    on(configActions.updateTitle, (state, action) => ({
      ...state,
      title: action.title
    }))
  )
});

export const reducers: ActionReducerMap<AppState> = {
  config: configFeature.reducer,
  router: fromRouter.routerReducer
};

export const selectTitle = configFeature.selectTitle;
