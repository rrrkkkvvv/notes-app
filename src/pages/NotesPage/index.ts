import CustomElement from "../../shared/utils/CustomElement";
import "./ui/Search/Search.ts";
import NotesPageLayout from "./NotesPage.html?raw";
import { AppModal } from "../../shared/ui/AppModal/AppModal.ts";
import "./ui/modals/AddNoteModal/AddNoteModal.ts";
import "./ui/modals/ChangeCategoryModal/ChangeCategoryModal.ts";
import "./ui/modals/FullNoteModal/FullNoteModal.ts";

import "../../entities/Note/ui/NotesList/index.ts";
@CustomElement({ selector: "notes-page", template: NotesPageLayout })
export default class NotesPage extends HTMLElement {
  constructor() {
    super();
  }
  public connectedCallback() {
    this.setAttribute("data-params", "");
    this.updateSearch();
    const addNoteBtn = this.querySelector(".add-btn");
    addNoteBtn?.addEventListener("click", () => {
      const addNoteModal = document.querySelector(
        ".add-note-modal"
      ) as AppModal;
      addNoteModal.open();
    });
  }
  public updateSearch() {
    const params = JSON.parse(this.getAttribute("data-params") || "{}");

    const searchInput = this.querySelector("input") as HTMLInputElement;

    const searchRefs = this.querySelectorAll("[data-search]");
    if (params.search && searchRefs) {
      searchInput.value = params.search;
      searchInput.focus();
      searchRefs.forEach((searchRef) => {
        if (searchRef.getAttribute("data-searchkey") !== params.search) {
          searchRef.setAttribute("data-search", params.search);
        }
      });
    }
    const categoryRefs = this.querySelectorAll("[data-current-category-key]");
    if (categoryRefs) {
      categoryRefs.forEach((categoryRef) => {
        if (
          categoryRef.getAttribute("data-current-category-key") !==
          params.category
        ) {
          categoryRef.setAttribute(
            "data-current-category-key",
            params.category ? params.category : ""
          );
        }
      });
    }
  }
  static get observedAttributes() {
    return ["data-params"];
  }
  attributeChangedCallback(name: string) {
    if (name === "data-params") {
      this.updateSearch();
    }
  }
}
