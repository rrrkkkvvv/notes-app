import { AppModal } from "../../../../shared/ui/AppModal/AppModal";
import CustomElement from "../../../../shared/utils/CustomElement";
import AddTodoModalLayout from "./AddTodoModal.html?raw";
import { dispatch } from "../../../../app/store/store";
import { addTodo } from "../../../../entities/Todo/model/todoSlice";

@CustomElement({
  selector: "add-todo-modal",
})
export class AddTodoModal extends AppModal {
  constructor() {
    super(AddTodoModalLayout);
  }

  public connectedCallback() {
    super.connectedCallback();

    this.setupListeners();
  }
  public setupListeners() {
    this.querySelector(".close-modal-x")?.addEventListener("click", (e) => {
      e.preventDefault();

      super.close();
    });
    this.querySelector(".modal")?.addEventListener("click", (e) => {
      e.preventDefault();

      super.close();
    });

    const todoTextInput = this.querySelector("input") as HTMLInputElement;
    const addTodoButton = this.querySelector("button") as HTMLButtonElement;
    addTodoButton.addEventListener("click", (e) => {
      e.stopPropagation();
      if (todoTextInput.value.trim()) {
        dispatch(addTodo(todoTextInput.value));
        todoTextInput.value = "";
        super.close();
      }
    });
  }
}
