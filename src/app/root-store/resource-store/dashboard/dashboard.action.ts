import { Action } from '@ngrx/store';
import { Dashboard } from '@app/models/dashboard.model';

export const LOAD = '[Dashboard] Fetch Dashboards From Server';
export const LOAD_SUCCESS = '[Dashboard] Fetch Dashboards From Server Success';
export const LOAD_FAIL = '[Dashboard] Fetch Dashboards From Server Fail';

export const CREATE = '[Dashboard] Create Dashboard';
export const CREATE_SUCCESS = '[Dashboard] Create Dashboard Success';
export const CREATE_FAIL = '[Dashboard] Create Dashboard Fail';

export const UPDATE = '[Dashboard] Update Dashboard';
export const UPDATE_SUCCESS = '[Dashboard] Update Dashboard Success';
export const UPDATE_FAIL = '[Dashboard] Update Dashboard Fail';

export const DELETE = '[Dashboard] Delete Dashboard';
export const DELETE_SUCCESS = '[Dashboard] Delete Dashboard Success';
export const DELETE_FAIL = '[Dashboard] Delete Dashboard Fail';

// *** Load Dashboard ***

export class Load implements Action {
  readonly type = LOAD;
  constructor() {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: Dashboard[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;
  constructor(public payload: Error) {}
}

// *** Create Dashboard ***

export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: Dashboard) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: Dashboard) {}
}

export class CreateFail implements Action {
  readonly type = CREATE_FAIL;
  constructor(public payload: Error) {}
}

// *** Update Dashboard ***

export class Update implements Action {
  readonly type = UPDATE;
  constructor(
    public payload: {
      id: number;
      changes: Partial<Dashboard>;
    }
  ) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(
    public payload: {
      id: number;
      changes: Dashboard;
    }
  ) {}
}

export class UpdateFail implements Action {
  readonly type = UPDATE_FAIL;
  constructor(public payload: Error) {}
}

// *** Delete Dashboard ***

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: number) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: Dashboard) {}
}

export class DeleteFail implements Action {
  readonly type = DELETE_FAIL;
  constructor(public error: Error) {}
}

export type Actions =
  | Create
  | CreateSuccess
  | CreateFail
  | Update
  | UpdateSuccess
  | UpdateFail
  | Delete
  | DeleteSuccess
  | DeleteFail
  | LoadSuccess
  | Load
  | LoadFail;
