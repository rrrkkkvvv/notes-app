import type { TNotesList } from "../../../../shared/types/EntityTypes";
import CustomElement from "../../../../shared/utils/CustomElement";
import NotesListLayout from "./NotesList.html?raw";
import "../NoteCard/NoteCard";
import { subscribeToSelector } from "../../../../app/store/store";
import { selectNotes } from "../../model/noteSlice";
@CustomElement({ selector: "notes-list", template: NotesListLayout })
export default class NotesList extends HTMLElement {
  constructor() {
    super();
  }
  public connectedCallback() {
    this.render();
  }
  private render() {
    subscribeToSelector(selectNotes, (notes) => {
      const cardsBlock = this.querySelector(".row");
      if (!cardsBlock) {
        return;
      }

      const placeholder = `<h2 class="ml-5">Add notes please...</h2>`;

      const filteredNotes = this.filterNotes(notes);
      if (!filteredNotes.length) {
        cardsBlock.innerHTML = placeholder;
        return;
      }
      cardsBlock.innerHTML = ``;
      filteredNotes.forEach((note) => {
        cardsBlock.insertAdjacentHTML(
          "beforeend",
          `
      <note-card data-note-id="${note.id}"></note-card>
      `
        );
      });
    });
    // dispatch(addNote({ text: "new", title: "title",  }));
    // ProxiedStore.notes = getNotesLS();
    // subscribe({
    //   type: "notes",
    //   cb: (notes) => {
    //     if (!notes) {
    //       this.innerHTML = `
    //     <h2 class="ml-5">Add notes please...</h2>
    //   `;
    //       return;
    //     }
    //     const filteredNotes = this.filterNotes(notes);
    //     const cardsBlock = this.querySelector(".row");
    //     if (!cardsBlock) return;
    //     cardsBlock.innerHTML = ``;
    //     filteredNotes.forEach((note) => {
    //       cardsBlock.insertAdjacentHTML(
    //         "beforeend",
    //         `
    //   <note-card data-note-id="${note.id}"></note-card>
    //   `
    //       );
    //     });
    //   },
    // });
  }
  private filterNotes(notes: TNotesList) {
    const searchFilter = this.getAttribute("data-search");
    const categoryFilter = this.getAttribute("data-current-category-key");
    if (!searchFilter && !categoryFilter) return notes;
    let filteredNotes = notes;
    if (searchFilter) {
      filteredNotes = filteredNotes.filter(
        (note) =>
          note.text.includes(searchFilter.trim()) ||
          note.title.includes(searchFilter.trim())
      );
    }
    if (categoryFilter && categoryFilter !== "all") {
      filteredNotes = filteredNotes.filter(
        (note) => note.categoryKey === categoryFilter
      );
    }
    return filteredNotes;
  }
  static get observedAttributes() {
    return ["data-search", "data-current-category-key"];
  }
  attributeChangedCallback() {
    this.render();
  }
}
