import CustomElement from "../../shared/utils/CustomElement.ts";
import PageWrapperLayout from "./PageWrapper.html?raw";
import "../TodosPage/ui/AddTodoModal/AddTodoModal.ts";
@CustomElement({ selector: "page-wrapper", template: PageWrapperLayout })
export class PageWrapper extends HTMLElement {
  connectedCallback() {}
}
