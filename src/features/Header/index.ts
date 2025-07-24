import { goTo } from "../../app/main";
import CustomElement from "../../shared/utils/CustomElement";
import headerLayout from "./index.html?raw";

@CustomElement({ selector: "nav-bar", template: headerLayout })
export default class Header extends HTMLElement {
  constructor() {
    super();
  }
  public connectedCallback() {
    const notesPageBtn = this.querySelector(".notes-btn");
    notesPageBtn?.addEventListener("click", () => {
      goTo("/");
      this.render();
    });

    const todosPageBtn = this.querySelector(".todos-btn");
    todosPageBtn?.addEventListener("click", () => {
      goTo("/todos");
      this.render();
    });
    window.addEventListener("popstate", () => {
      this.render();
    });
    this.render();
  }
  private render() {
    if (location.pathname.includes("todos")) {
      this.setCurrentPageButton("todos");
    } else {
      this.setCurrentPageButton("notes");
    }
  }

  private setCurrentPageButton(type: "notes" | "todos") {
    const notesPageBtn = this.querySelector(".notes-btn");
    const todosPageBtn = this.querySelector(".todos-btn");
    if (type === "notes") {
      notesPageBtn?.classList.add("bg-warning");
      notesPageBtn?.classList.add("text-black");
      todosPageBtn?.classList.remove("bg-warning");
      todosPageBtn?.classList.remove("text-black");
    } else if (type === "todos") {
      todosPageBtn?.classList.add("bg-warning");
      todosPageBtn?.classList.add("text-black");
      notesPageBtn?.classList.remove("bg-warning");
      notesPageBtn?.classList.remove("text-black");
    }
  }
}
