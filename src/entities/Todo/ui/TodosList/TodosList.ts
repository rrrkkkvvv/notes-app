import type { TTodo } from "../../../../shared/types/EntityTypes";
import CustomElement from "../../../../shared/utils/CustomElement";
import TodosListLayout from "./TodosList.html?raw";
import { subscribeToSelector } from "../../../../app/store/store";
import { selectTodos } from "../../model/todoSlice";
import "../TodoItem/TodoItem";
@CustomElement({ selector: "todos-list", template: TodosListLayout })
export default class TodosList extends HTMLElement {
  constructor() {
    super();
  }
  public connectedCallback() {
    this.render();
  }
  private render() {
    subscribeToSelector(selectTodos, (todos) => {
      const todosList = this.querySelector(".todos-list");
      if (!todosList) {
        return;
      }

      const placeholder = `<h2 class="m-3">Add todos please...</h2>`;

      if (!todos || !todos.length) {
        todosList.innerHTML = placeholder;
        return;
      }

      todosList.innerHTML = ``;
      todos.forEach((todo: TTodo) => {
        todosList.insertAdjacentHTML(
          "beforeend",
          `
      <todo-item data-todo-id="${todo.id}"></todo-item>
      `
        );
      });
    });
  }
}
