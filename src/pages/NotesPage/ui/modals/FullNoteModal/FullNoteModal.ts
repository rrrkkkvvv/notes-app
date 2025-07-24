import { AppModal } from "../../../../../shared/ui/AppModal/AppModal";
import CustomElement from "../../../../../shared/utils/CustomElement";
import FullNoteModalLayout from "./FullNoteModal.html?raw";
import { dispatch } from "../../../../../app/store/store";
import {
  selectNoteById,
  updateNote,
} from "../../../../../entities/Note/model/noteSlice";
import type { TNote } from "../../../../../shared/types/EntityTypes";

@CustomElement({
  selector: "full-note-modal",
})
export class FullNoteModal extends AppModal {
  private note: TNote | null = null;
  constructor() {
    super(FullNoteModalLayout);
  }

  public connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  public setupValues() {
    if (!this.note) return;
    const noteTitleInput = this.querySelector("input") as HTMLInputElement;
    const noteTextInput = this.querySelector("textarea") as HTMLTextAreaElement;
    const noteDate = this.querySelector(
      ".fullNote-date-block"
    ) as HTMLSpanElement;
    const textLengthElem = this.querySelector(
      ".fullNote-text-length-block"
    ) as HTMLElement;

    noteTitleInput.value = this.note.title;
    noteTextInput.value = this.note.text;
    noteDate.textContent = this.note.date;

    textLengthElem.textContent = `${noteTitleInput.value.length} symbols`;
  }
  public setupListeners() {
    this.querySelector(".close-modal-x")?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.updateNote();

      super.close();
    });
    this.querySelector(".modal")?.addEventListener("click", (e) => {
      e.preventDefault();

      this.updateNote();
      super.close();
    });
    const moveToButton = this.querySelector(
      ".category-choose-button"
    ) as HTMLSpanElement;
    moveToButton.addEventListener("click", () => {
      if (!this.note) return;
      const changeCategoryModal = document.querySelector(
        ".change-category-modal"
      ) as AppModal;
      this.close();
      changeCategoryModal.setAttribute("data-note-id", this.note.id);
      changeCategoryModal.open();
    });
    const noteTitleInput = this.querySelector("input") as HTMLInputElement;
    const noteTextInput = this.querySelector("textarea") as HTMLTextAreaElement;

    const textLengthElem = this.querySelector(
      ".fullNote-text-length-block"
    ) as HTMLElement;

    noteTextInput.addEventListener("input", () => {
      textLengthElem.textContent = `${noteTextInput.value.length} symbols`;
      if (!this.note) return;
      this.updateNote();
    });
    noteTitleInput.addEventListener("input", () => {
      if (!this.note) return;
      this.updateNote();
    });
  }
  public render() {
    const noteId = this.getAttribute("data-full-note");
    if (!noteId) return;
    const note = selectNoteById(noteId);
    if (!note) return;
    this.note = note;

    this.setupListeners();
    this.setupValues();
  }
  public updateNote() {
    const noteTitleInput = this.querySelector("input") as HTMLInputElement;
    const noteTextInput = this.querySelector("textarea") as HTMLTextAreaElement;

    const newText = noteTextInput.value;
    const newTitle = noteTitleInput.value;

    if (!newText.trim().length && !newTitle.trim().length) return;
    if (!this.note) return;
    if (newText === this.note.text && newTitle === this.note.title) return;
    const updatedNote = {
      id: this.note.id,
      title: newTitle,
      text: newText,
    };
    dispatch(
      updateNote({
        ...updatedNote,
      })
    );
  }
  static get observedAttributes() {
    return ["data-full-note", "data-current-category-key"];
  }
  attributeChangedCallback() {
    this.render();
  }
}
