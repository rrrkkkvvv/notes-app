import { applyMiddleware } from "./lib/applyMiddleware";
import { rootReducer, type RootState } from "./reducers/rootReducer";
import { thunkMiddleware } from "./middlewares/thunkMiddleware";
import type { TAction, TThunk } from "./lib/types";

import { createStore } from "./lib/createStore";

export type AppThunk = TThunk<RootState, TAction>;
export type AvailableActions = AppThunk | TAction;

const createStoreWithMiddleware =
  applyMiddleware<RootState>(thunkMiddleware)(createStore);
const storeWithMiddleware = createStoreWithMiddleware(rootReducer);
export const { dispatch, getState, subscribe } = storeWithMiddleware;
// TODO: REMOVE ANY TYPE BECAUSE ANTI PATTERN
export const subscribeToSelector = <
  Selector extends (state: RootState | any) => Selected,
  Selected = ReturnType<Selector>
>(
  // selector: TSelector<RootState>,
  selector: Selector,
  // callback: TSelectorCallback<ReturnType<typeof selector>>
  callback: (value: Selected) => void
) => {
  let lastValue = selector(getState());
  const handleChange = () => {
    let newValue = selector(getState());
    if (newValue !== lastValue) {
      lastValue = newValue;
      callback(newValue);
    }
  };
  callback(selector(getState()));
  const unsubscribe = subscribe(handleChange);
  return unsubscribe;
};
