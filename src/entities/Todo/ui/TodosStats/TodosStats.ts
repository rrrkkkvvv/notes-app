import { subscribeToSelector } from "../../../../app/store/store";
import type { TTodo, TTodosList } from "../../../../shared/types/EntityTypes";
import CustomElement from "../../../../shared/utils/CustomElement";
import { selectTodos } from "../../model/todoSlice";
import TodosStatsLayout from "./TodosStats.html?raw";

@CustomElement({ selector: "todos-stats", template: TodosStatsLayout })
export default class TodosStats extends HTMLElement {
  constructor() {
    super();
  }
  public connectedCallback() {
    this.render();
  }
  private render() {
    subscribeToSelector(selectTodos, (todos: TTodosList) => {
      const todoCountElem = this.querySelector(".todo") as HTMLElement;
      const doneCountElem = this.querySelector(".done") as HTMLElement;

      if (!todos || !todos.length) {
        todoCountElem.textContent = "0";
        doneCountElem.textContent = "0";
        return;
      }
      const doneTodosCount = todos.filter(
        (todo: TTodo) => todo.completed !== false
      ).length;
      const todoTodosCount = todos.length - doneTodosCount;
      todoCountElem.textContent = `${todoTodosCount}`;
      doneCountElem.textContent = `${doneTodosCount}`;
    });
  }
}
