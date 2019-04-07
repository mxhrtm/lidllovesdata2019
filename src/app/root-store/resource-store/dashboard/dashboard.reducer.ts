import * as fromActions from './dashboard.action';

import { adapter, initialState, State } from './dashboard.state';

export function reducer(
  state: State = initialState,
  action: fromActions.Actions
) {
  switch (action.type) {
    case fromActions.LOAD: {
      return {
        ...state,
        loading: true
      };
    }

    case fromActions.LOAD_SUCCESS: {
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case fromActions.LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };

    case fromActions.CREATE:
      return {
        ...state,
        creating: true
      };

    case fromActions.CREATE_SUCCESS:
      return adapter.addOne(action.payload, {
        ...state,
        creating: false,
        created: true
      });

    case fromActions.CREATE_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        error: action.payload
      };

    case fromActions.UPDATE:
      return {
        ...state,
        creating: true
      };

    case fromActions.UPDATE_SUCCESS:
      return adapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload.changes
        },
        {
          ...state,
          updating: true,
          updated: false
        }
      );

    case fromActions.DELETE_SUCCESS:
      return adapter.removeOne(action.payload.id, {
        ...state,
        updating: false,
        updated: false,
        error: action.payload
      });

    default:
      return state;
  }
}
