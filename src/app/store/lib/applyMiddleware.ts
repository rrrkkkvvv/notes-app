import type { AvailableActions } from "../store";
import type { TCreateStore, TMiddleware, TReducer } from "./types";

export const applyMiddleware = <State>(
  middleware: TMiddleware<State, AvailableActions>
) => {
  return (createStore: TCreateStore) => {
    return (reducer: TReducer<State, AvailableActions>) => {
      const store = createStore(reducer);
      return {
        dispatch: (action: AvailableActions) =>
          middleware(store)(store.dispatch)(action),
        getState: store.getState,
        subscribe: store.subscribe,
      };
    };
  };
};
