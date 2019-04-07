import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Dashboard } from '@app/models/dashboard.model';


// Entity Adapter
export const adapter = createEntityAdapter<Dashboard>({
  selectId: entity => entity.id,
  sortComparer: (a: Dashboard, b: Dashboard): number =>{
    if(a.id > b.id) return 1;
    else if(a.id < b.id) return -1;
    return 0;
  }
});

export interface State extends EntityState<Dashboard> {
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  updated: boolean;
  creating: boolean;
  created: boolean;
  deleting: boolean;
  deleted: boolean;
  error: any;
}

const defaultDashboard = {
  loaded: false,
  loading: false,
  updating: false,
  updated: false,
  creating: false,
  created: false,
  deleting: false,
  deleted: false,
  error: '',
  ids: [],
  entities: {}
};

export const initialState: State = adapter.getInitialState(defaultDashboard);
