import { AppModal } from "../../../../../shared/ui/AppModal/AppModal";
import CustomElement from "../../../../../shared/utils/CustomElement";
import ChangeCategoryModalLayout from "./ChangeCategoryModal.html?raw";
import { dispatch, subscribeToSelector } from "../../../../../app/store/store";
import type { TCategoriesList } from "../../../../../shared/types/EntityTypes";
import {
  addCategory,
  selectCategories,
} from "../../../../../entities/Category/model/categorySlice";

@CustomElement({
  selector: "change-category-modal",
})
export class ChangeNoteModal extends AppModal {
  constructor() {
    super(ChangeCategoryModalLayout);
  }

  public connectedCallback() {
    super.connectedCallback();
    this.render();
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

    const showAddBtnMenu = this.querySelector(".add-btn") as HTMLButtonElement;
    showAddBtnMenu.addEventListener("click", () => {
      toggleShowAddCategory();
    });
    const toggleShowAddCategory = () => {
      const addBtn = this.querySelector(".add-btn") as HTMLButtonElement;
      const addCategoryContainer = this.querySelector(
        ".collapse"
      ) as HTMLElement;

      if (
        addBtn.classList.contains("show") &&
        addCategoryContainer.classList.contains("show")
      ) {
        addBtn.classList.remove("show");
        addCategoryContainer.classList.remove("show");
      } else {
        addBtn.classList.add("show");
        addCategoryContainer.classList.add("show");
      }
    };
    const addCategoryBtn = this.querySelector(
      ".add-category-btn"
    ) as HTMLButtonElement;
    const categoryTitleInput = this.querySelector(
      ".category-title-input"
    ) as HTMLInputElement;
    addCategoryBtn.addEventListener("click", () => {
      this.addCategory(categoryTitleInput.value);
      // toggleShowAddCategory();
      categoryTitleInput.value = "";
    });
  }
  private addCategory(title: string) {
    dispatch(addCategory(title));
  }
  public render() {
    const noteId = this.getAttribute("data-note-id");
    if (!noteId) return;

    this.setupListeners();
    subscribeToSelector(selectCategories, (categories: TCategoriesList) => {
      const categoriesListElement = this.querySelector(
        "ul"
      ) as HTMLUListElement;
      categoriesListElement.innerHTML = "";
      categoriesListElement.insertAdjacentHTML(
        "beforeend",
        `<change-category data-key="all" data-note-id="${noteId}"></change-category>`
      );
      const filteredCategories = categories.filter(
        (category) => category.key !== "all"
      );
      filteredCategories.forEach((category) => {
        categoriesListElement.insertAdjacentHTML(
          "beforeend",
          `<change-category data-key="${category.key}" data-note-id="${noteId}"></change-category>`
        );
      });
    });
  }

  static get observedAttributes() {
    return ["data-note-id"];
  }
  attributeChangedCallback() {
    this.render();
  }
}
