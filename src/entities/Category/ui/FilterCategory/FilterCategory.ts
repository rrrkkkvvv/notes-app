import { goTo } from "../../../../app/main";
import CustomElement from "../../../../shared/utils/CustomElement";
import FilterCategoryLayout from "./FilterCategory.html?raw";
@CustomElement({ selector: "filter-category", template: FilterCategoryLayout })
export class FilterCategory extends HTMLElement {
  constructor() {
    super();
  }
  public connectedCallback() {
    this.render();
  }
  private render() {
    const title = this.getAttribute("data-title");
    const key = this.getAttribute("data-key");
    const isCurrent = this.hasAttribute("data-is-current");

    if (!key || !title) return;
    const liElement = this.querySelector("li") as HTMLLIElement;
    const titleElement = this.querySelector("span") as HTMLSpanElement;

    if (isCurrent) {
      titleElement.classList.add("bg-warning");
    }
    titleElement.textContent = title;
    liElement.addEventListener("click", () => {
      this.setCurrentCategory(key);
    });
  }
  private setCurrentCategory(categoryKey: string) {
    let url = new URL(location.origin + location.pathname + location.search);
    url.searchParams.set("category", categoryKey);
    goTo(url.search);
  }
}
