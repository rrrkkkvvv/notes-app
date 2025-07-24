import { categoriesReducer } from "../../../entities/Category/model/categorySlice";
import { notesReducer } from "../../../entities/Note/model/noteSlice";
import { todosReducer } from "../../../entities/Todo/model/todoSlice";
import type {
  TAction,
  TReducer,
  TReducersMap,
  TStateFromReducers,
  TThunk,
} from "../lib/types";

const combineReducers = <Reducers extends TReducersMap>(
  reducers: Reducers
): TReducer<TStateFromReducers<Reducers>, TAction | TThunk<any, TAction>> => {
  return (state, action) => {
    const nextState = {} as TStateFromReducers<Reducers>;
    Object.entries(reducers).forEach(([key, reducer]) => {
      const typedKey = key as keyof Reducers;
      nextState[typedKey] = reducer(state ? state[key] : undefined, action);
    });
    return { ...nextState };
  };
};

export const rootReducer = combineReducers({
  notesState: notesReducer,
  categoriesState: categoriesReducer,
  todosState: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
