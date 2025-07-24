import { nanoid } from "nanoid";
import { createSlice } from "../../../app/store/lib/createSlice";
import type { TAction } from "../../../app/store/lib/types";
import { getState, type AppThunk } from "../../../app/store/store";
import type { TTodo, TTodosList } from "../../../shared/types/EntityTypes";
import { getTodosLS, setTodosLS } from "../../../shared/utils/localStorage";

type TInitialState = {
  todos: TTodosList | null;
};
const initialState: TInitialState = {
  todos: getTodosLS(),
};

const todoSlice = createSlice({
  name: "todosState",
  initialState,
  reducers: {
    setTodos: (state, action: TAction<"SET_TODOS", TTodosList>) => ({
      ...state,
      todos: action.payload,
    }),
  },
  selectors: {
    selectTodos: (state) => state.todos,
  },
});
export const selectTodoById = (id: string) =>
  getState().todosState.todos?.find((todo) => todo.id === id);
const { setTodos } = todoSlice.actions;
export const { selectTodos } = todoSlice.selectors;

export const addTodo =
  (text: string): AppThunk =>
  async (dispatch, getState) => {
    const todos = getState().todosState.todos;

    if (!text.trim().length) return;

    const newTodo = {
      id: nanoid(),
      text,
      completed: false,
    };
    let newTodosList = todos ? [...todos, newTodo] : [newTodo];
    dispatch(setTodos(newTodosList));
    setTodosLS(newTodosList);
  };
export const removeTodo =
  (todoId: string): AppThunk =>
  async (dispatch, getState) => {
    const todos = getState().todosState.todos;
    if (!todos) return;
    let newTodosList = todos.filter((todo: TTodo) => todo.id !== todoId);
    dispatch(setTodos(newTodosList));
    setTodosLS(newTodosList);
  };
export const toggleTodo =
  (todoId: string): AppThunk =>
  async (dispatch, getState) => {
    const todos = getState().todosState.todos;
    if (!todos) return;

    let newTodosList = todos.map((todo: TTodo) => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        completed: !todo.completed,
      };
    });
    dispatch(setTodos(newTodosList));
    setTodosLS(newTodosList);
  };

export const todosReducer = todoSlice.reducer;
