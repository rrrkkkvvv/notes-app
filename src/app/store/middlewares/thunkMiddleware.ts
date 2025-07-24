import type { TDispatch, TStore } from "../lib/types";

export const thunkMiddleware =
  <State, Action>(store: TStore<State, Action>) =>
  (dispatch: TDispatch<Action>) =>
  (action: Action) => {
    if (typeof action === "function") {
      return action(store.dispatch, store.getState);
    }

    return dispatch(action);
  };
