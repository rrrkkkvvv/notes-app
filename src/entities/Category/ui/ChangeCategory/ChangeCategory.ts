import { dispatch, subscribeToSelector } from "../../../../app/store/store";
import CustomElement from "../../../../shared/utils/CustomElement";
import { selectNoteById, updateNote } from "../../../Note/model/noteSlice";
import { removeCategory, selectCategoryByKey } from "../../model/categorySlice";
import ChangeCategoryLayout from "./ChangeCategory.html?raw";
@CustomElement({ selector: "change-category", template: ChangeCategoryLayout })
export class ChangeCategory extends HTMLElement {
  constructor() {
    super();
  }
  public connectedCallback() {
    this.render();
  }
  private render() {
    const noteId = this.getAttribute("data-note-id");
    if (!noteId) return;
    subscribeToSelector(
      () => {
        return selectNoteById(noteId);
      },
      (note) => {
        if (!note) return;

        const key = this.getAttribute("data-key");
        if (!key) return;
        const category = selectCategoryByKey(key);

        if (!category) return;

        const titleElement = this.querySelector("span") as HTMLSpanElement;
        titleElement.classList.remove("bg-warning");
        if (note.categoryKey === category.key) {
          titleElement.classList.add("bg-warning");
        }
        titleElement.innerHTML = "";
        titleElement.textContent = category.title;
        if (category.key !== "all") {
          titleElement.textContent = category.title;

          titleElement.insertAdjacentHTML(
            "beforeend",
            `
        <button class="btn remove-category  text-danger"   >
            <i class="bi bi-trash3" ></i>
        </button>
        `
          );
          titleElement
            .querySelector("button")
            ?.addEventListener("click", (e) => {
              e.stopPropagation();
              dispatch(removeCategory(category.key));
            });
        }
        titleElement.addEventListener("click", () => {
          if (category.key === note.categoryKey) return;
          dispatch(updateNote({ id: noteId, categoryKey: category.key }));
        });
      }
    );
  }
}
