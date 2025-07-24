import { goTo } from "../../../../app/main";
import CustomElement from "../../../../shared/utils/CustomElement";
import searchLayout from "./Search.html?raw";

@CustomElement({ selector: "search-input", template: searchLayout })
export default class NotesPage extends HTMLElement {
  private debounceTimeout: ReturnType<typeof setTimeout> | null = null;
  constructor() {
    super();
  }
  public connectedCallback() {
    const input = this.querySelector("input");
    input?.addEventListener("input", () => {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }
      this.debounceTimeout = setTimeout(() => {
        let url = new URL(
          location.origin + location.pathname + location.search
        );
        if (input.value) {
          url.searchParams.set("search", input.value);
        } else {
          url.searchParams.delete("search");
        }

        goTo(url.search);
      }, 300);
    });
  }
}
