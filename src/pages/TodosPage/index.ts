import type { AppModal } from "../../shared/ui/AppModal/AppModal.ts";
import CustomElement from "../../shared/utils/CustomElement";
import TodosPageLayout from "./TodosPage.html?raw";
import "./ui/AddTodoModal/AddTodoModal.ts";
@CustomElement({ selector: "todos-page", template: TodosPageLayout })
export class TodosPage extends HTMLElement {
  connectedCallback() {
    const addTodoBtn = this.querySelector(".add-btn");
    const addTodoModal = this.querySelector(".add-todo-modal") as AppModal;
    addTodoBtn?.addEventListener("click", () => {
      addTodoModal.open();
    });
  }
}
