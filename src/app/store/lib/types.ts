export type TAction<ActionType = any, ActionPayload = any> = {
  type: ActionType;
  payload: ActionPayload;
};

export type TReducer<State, Action = TAction> = (
  state: State | undefined,
  action: Action
) => State;

export type TReducersMap = {
  [key: string]: TReducer<any, any>;
};
export type TStateFromReducers<Reducer extends TReducersMap> = {
  [ReducerName in keyof Reducer]: Reducer[ReducerName] extends TReducer<
    infer ReducersState,
    any
  >
    ? ReducersState
    : never;
};
export type TDispatch<Action> = (action: Action) => void;
export type TStore<State, Action = TAction> = {
  getState: () => State;
  dispatch: TDispatch<Action>;
  subscribe: (cb: TStoreSubscriber) => () => void;
};
export type TMiddleware<State, Action = TAction> = (
  store: TStore<State, Action>
) => (dispatch: TDispatch<Action>) => (action: Action) => void;

export type TThunk<State, Action = TAction, Args = any> = (
  dispatch: (action: Action | TThunk<State, Action, Args>) => void,
  getState: () => State
) => void;

export type TCreateStore = <State, Action = TAction>(
  reducer: TReducer<State, Action>
) => TStore<State, Action>;

export type TStoreSubscriber = () => void;
export type TStoreSubscribers = Array<TStoreSubscriber>;

export type TSelector<State> = (state: State) => unknown;
export type TSelectorCallback<SelectedValue> = (
  selectedValue: SelectedValue
) => void;
