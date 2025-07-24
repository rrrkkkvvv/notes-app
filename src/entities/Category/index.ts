import CustomElement from "../../shared/utils/CustomElement";
import CategoriesListLayout from "./CategoriesList.html?raw";
import "./ui/FilterCategory/FilterCategory.ts";
import "./ui/ChangeCategory/ChangeCategory.ts";
import { subscribeToSelector } from "../../app/store/store.ts";
import {
  selectCategories,
  selectCategoryByKey,
} from "./model/categorySlice.ts";
import type { TCategoriesList } from "../../shared/types/EntityTypes.ts";
import { goTo } from "../../app/main.ts";
@CustomElement({ selector: "categories-list", template: CategoriesListLayout })
export default class CategoriesList extends HTMLElement {
  private currentCategory = "";
  constructor() {
    super();
  }
  public connectedCallback() {
    this.render();
  }

  public resetCurrentCategory() {
    this.currentCategory = "";
    let url = new URL(location.origin + location.pathname + location.search);
    url.searchParams.delete("category");
    goTo(url.search);
  }

  private render() {
    subscribeToSelector(selectCategories, (categories: TCategoriesList) => {
      const listElement = this.querySelector("ul") as HTMLUListElement;
      listElement.innerHTML = "";
      const filteredCategories = categories.filter(
        (category) => category.key !== "all"
      );
      listElement.insertAdjacentHTML(
        "beforeend",
        `
        <filter-category ${
          (!this.currentCategory && "data-is-current") ||
          (this.currentCategory === "all" && "data-is-current")
        } data-title="All" data-key="all"></filter-category>
        
      `
      );
      filteredCategories.forEach((category) => {
        listElement.insertAdjacentHTML(
          "beforeend",
          `
        <filter-category ${
          category.key === this.currentCategory && "data-is-current"
        } data-title="${category.title}" data-key="${
            category.key
          }"></filter-category>
      `
        );
      });
    });
  }
  static get observedAttributes() {
    return ["data-current-category-key"];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "data-current-category-key") {
      if (newValue && selectCategoryByKey(newValue)) {
        this.currentCategory = newValue;
        this.render();
      } else if (newValue && !selectCategoryByKey(newValue)) {
        this.resetCurrentCategory();
      }
    }
  }
}
