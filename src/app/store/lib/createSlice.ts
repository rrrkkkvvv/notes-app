import type { TAction, TReducer } from "./types";

// type CaseReducer<S = any, A extends Action = UnknownAction> = (state: Draft<S>, action: A) => NoInfer<S> | void | Draft<NoInfer<S>>;
type ReducerFunction<State = any> = (state: State, action: TAction) => State;

type SliceReducers<State> = Record<string, ReducerFunction<State>>;
export type SliceSelectors<State> = {
  [K: string]: (sliceState: State) => any;
};

type TCreateSliceProps<State> = {
  name: string;
  initialState: State;

  reducers: SliceReducers<State>;
  selectors?: SliceSelectors<State>;
};

type TCreateSliceResult<State, Action extends TAction = TAction> = {
  reducer: TReducer<State, TAction>;
  actions: {
    [key: string]: (payload: Action["payload"]) => Action;
  };
  selectors: SliceSelectors<{ [key: string]: State }>;
};
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

export function createSlice<State>({
  name,
  initialState,
  reducers,
  selectors = {},
}: TCreateSliceProps<State>): TCreateSliceResult<State> {
  const actions = {} as TCreateSliceResult<State>["actions"];

  Object.entries(reducers).forEach(([key, reducer]) => {
    actions[key] = (
      payload: ArgumentTypes<typeof reducer>["1"]["payload"]
    ) => ({ type: `${name}/${key}`, payload });
  });

  const reducer: TReducer<State> = (state = initialState, action) => {
    const type = action.type as string;
    const localType = type.replace(`${name}/`, "");

    const caseReducer = reducers[localType];
    if (caseReducer) {
      return caseReducer(state, action);
    }
    return state;
  };

  const wrappedSelectors: TCreateSliceResult<State>["selectors"] = {};
  for (const [key, selector] of Object.entries(selectors)) {
    wrappedSelectors[key] = <RootState extends { [name]: State }>(
      rootState: RootState
    ) => {
      const sliceState = rootState[name];
      return selector(sliceState);
    };
  }
  return {
    reducer,
    actions,
    selectors: wrappedSelectors,
  };
}
