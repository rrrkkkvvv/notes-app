import CustomElement from "../../shared/utils/CustomElement";
import type { TRouteObject } from "./types";

CustomElement({ selector: "app-router" });
class AppRouter extends HTMLElement {
  private routes: TRouteObject[] | null = null;
  public connectedCallback() {
    this.init();
    const routerAttrData = this.getAttribute("data-router");

    if (!routerAttrData) return;
    const parsedRouter = JSON.parse(routerAttrData);
    if (typeof parsedRouter !== "object") return;

    let isParsedRouterLegit: boolean = true;

    Object.keys(parsedRouter).forEach((key) => {
      if (typeof key !== "string") {
        isParsedRouterLegit = false;
      }
    });
    Object.values(parsedRouter).forEach((value) => {
      if (value! instanceof HTMLElement) {
        isParsedRouterLegit = false;
      }
    });

    if (!isParsedRouterLegit) return;
    this.routes = parsedRouter;
  }
  public init() {
    const links = document.querySelectorAll<HTMLAnchorElement>("a");
    links.forEach((link) => {
      link.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href) {
          this.goTo(href);
        }
      });
    });
    window.addEventListener("popstate", (e) => {
      const state = e.state;
      const route = state?.route || location.pathname + location.search;
      this.goTo(route, false);
    });

    this.goTo(location.pathname + location.search, false);
  }

  public goTo(path: string, addToHistory: boolean = true) {
    const url = new URL(path, location.origin);
    const cleanPath = url.pathname;
    const searchParams = url.searchParams;

    if (addToHistory) {
      history.pushState({ route: path }, "", path);
    }

    this.render(cleanPath, searchParams);
  }

  private render(path: string, searchParams?: URLSearchParams) {
    if (!this.routes) return;
    /*TODO: 
    check is this route is children
        if it is - find outlet element inside of router and replace is with route element
        if its not - replace whole innerHtml with new element, also if new route has its own childrens, have to render index children or first in the list
    

    */
    const splitedPath = path.split("/");
    console.log(splitedPath);
    const routeLayout = this.routes.find(
      (route) => route.path === path
    )?.element;

    if (routeLayout) {
      this.innerHTML = "";
      if (searchParams) {
        routeLayout.setAttribute(
          "data-params",
          JSON.stringify(Object.fromEntries(searchParams.entries()))
        );
      }

      this.appendChild(routeLayout);
    } else {
      console.warn("Route not found:", path);
    }
  }
  static get observedAttributes() {
    return [""];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "") {
    }
  }
}
