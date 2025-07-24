import type { AvailableActions } from "../store";
import type { TReducer, TStoreSubscriber, TStoreSubscribers } from "./types";

export const createStore = <State, Action = AvailableActions>(
  reducer: TReducer<State, Action>
) => {
  let state = reducer(undefined, { type: "__INIT__" } as Action);
  let subscribers: TStoreSubscribers = [];

  return {
    getState: () => state,
    dispatch: (action: Action) => {
      state = reducer(state, action);
      subscribers.forEach((cb) => cb());
    },
    subscribe: (cb: TStoreSubscriber) => {
      subscribers.push(cb);
      return () => {
        subscribers = subscribers.filter((sub) => sub !== cb);
      };
    },
  };
};
