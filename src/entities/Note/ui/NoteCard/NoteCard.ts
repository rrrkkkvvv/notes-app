import { dispatch } from "../../../../app/store/store";
import type { AppModal } from "../../../../shared/ui/AppModal/AppModal";
import CustomElement from "../../../../shared/utils/CustomElement";
import { removeNote, selectNoteById } from "../../model/noteSlice";
import NoteCardLayout from "./NoteCard.html?raw";

@CustomElement({ selector: "note-card", template: NoteCardLayout })
export class NoteCard extends HTMLElement {
  constructor() {
    super();
  }
  public connectedCallback() {
    const noteId = this.getAttribute("data-note-id");
    if (!noteId) {
      return;
    }
    const note = selectNoteById(noteId);
    if (note) {
      const titleElem = this.querySelector(".card-title") as HTMLElement;
      const textElem = this.querySelector(".card-text") as HTMLElement;
      const dateElem = this.querySelector(".date-block") as HTMLElement;
      const removeElem = this.querySelector(".remove-note") as HTMLElement;
      titleElem.textContent = note.title;
      textElem.textContent = note.text;
      dateElem.textContent = note.date;
      removeElem.addEventListener("click", (e) => {
        e.stopPropagation();
        const removeAgree = confirm(
          `You definitely want to remove an "${note.title}" note`
        );
        if (removeAgree) {
          dispatch(removeNote(noteId));
        }
      });
      this.addEventListener("click", () => {
        const fullNoteModal = document.querySelector(
          ".full-note-modal"
        ) as AppModal;
        fullNoteModal.setAttribute("data-full-note", note.id);
        fullNoteModal.open();
      });
    }
  }
}
