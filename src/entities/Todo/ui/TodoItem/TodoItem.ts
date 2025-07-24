import { dispatch } from "../../../../app/store/store";
import CustomElement from "../../../../shared/utils/CustomElement";
import { removeTodo, selectTodoById, toggleTodo } from "../../model/todoSlice";
import TodoItemLayout from "./TodoItem.html?raw";

@CustomElement({ selector: "todo-item", template: TodoItemLayout })
export class TodoItem extends HTMLElement {
  constructor() {
    super();
  }
  public connectedCallback() {
    const todoId = this.getAttribute("data-todo-id");
    if (!todoId) {
      return;
    }
    const todo = selectTodoById(todoId);
    if (todo) {
      const todoElem = this.querySelector(".todo-item") as HTMLElement;
      const textElem = this.querySelector(".todo-item__text") as HTMLElement;
      const statusElem = this.querySelector(
        ".todo-item__status"
      ) as HTMLElement;
      const removeElem = this.querySelector(
        ".todo-item__remove-button"
      ) as HTMLElement;
      textElem.textContent = todo.text;
      if (todo.completed) {
        todoElem.classList.add(
          "gray",
          "text-secondary",
          "text-decoration-line-through"
        );
        statusElem.classList.add("bi-x-lg", "bg-secondary", "bg-opacity-50");
      } else {
        statusElem.classList.add("bi-check2", "bg-warning");
      }
      removeElem.addEventListener("click", (e) => {
        e.stopPropagation();
        const removeAgree = confirm(
          `You definitely want to remove an "${todo.text}" todo`
        );
        if (removeAgree) {
          dispatch(removeTodo(todoId));
        }
      });
      this.addEventListener("click", () => {
        dispatch(toggleTodo(todoId));
      });
    }
  }
}
