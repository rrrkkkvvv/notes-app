import { AppModal } from "../../../../../shared/ui/AppModal/AppModal";
import CustomElement from "../../../../../shared/utils/CustomElement";
import AddNoteModalLayout from "./AddNoteModal.html?raw";
import { dispatch } from "../../../../../app/store/store";
import { addNote } from "../../../../../entities/Note/model/noteSlice";
import { selectCategoryByKey } from "../../../../../entities/Category/model/categorySlice";

@CustomElement({
  selector: "add-note-modal",
})
export class AddNoteModal extends AppModal {
  constructor() {
    super(AddNoteModalLayout);
  }

  public connectedCallback() {
    super.connectedCallback();

    this.setupListeners();

    const noteTextInput = this.querySelector("textarea") as HTMLTextAreaElement;
    const textLengthElem = this.querySelector(
      ".fullNote-text-length-block"
    ) as HTMLElement;

    textLengthElem.textContent = `0 symbols`;

    noteTextInput.addEventListener("input", () => {
      textLengthElem.textContent = `${noteTextInput.value.length} symbols`;
    });
  }
  public setupListeners() {
    this.querySelector(".close-modal-x")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.addNote();

      super.close();
    });
    this.querySelector(".modal")?.addEventListener("click", (e) => {
      e.preventDefault();

      this.addNote();
      super.close();
    });
  }
  public addNote() {
    const noteTitleInput = this.querySelector("input") as HTMLInputElement;
    const noteTextInput = this.querySelector("textarea") as HTMLTextAreaElement;

    const text = noteTextInput.value;
    const title = noteTitleInput.value;

    if (!text.trim().length && !title.trim().length) return;
    const categoryKey = this.getAttribute("data-current-category-key");

    let newNoteCategoryKey = "all";
    if (categoryKey) {
      const category = selectCategoryByKey(categoryKey);
      if (category) {
        newNoteCategoryKey = category.key;
      }
    }
    const newNote = {
      text,
      title,

      categoryKey: newNoteCategoryKey,
    };
    dispatch(
      addNote({
        ...newNote,
      })
    );
    noteTitleInput.value = "";
    noteTextInput.value = "";
  }
}
