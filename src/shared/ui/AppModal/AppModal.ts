import AppModalLayout from "./AppModal.html?raw";

export class AppModal extends HTMLElement {
  private modalEl: HTMLElement;

  constructor(layout: string) {
    super();

    this.innerHTML = AppModalLayout;
    const contentBlock = this.querySelector(".modal-body");
    contentBlock?.insertAdjacentHTML("beforeend", layout);

    this.modalEl = this.querySelector(".modal") as HTMLElement;
  }
  connectedCallback() {
    this.querySelector(".modal-body")?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this.querySelector(".close-modal-x")?.addEventListener("click", () => {
      this.close();
    });
    this.modalEl.addEventListener("click", () => {
      this.close();
    });
  }

  public open() {
    this.modalEl.classList.add("visible");
  }

  public close() {
    this.modalEl.classList.remove("visible");
  }
}
