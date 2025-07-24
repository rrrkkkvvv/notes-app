import CustomElement from "../../shared/utils/CustomElement";
import type { TRouteObject } from "./types";

@CustomElement({ selector: "app-router" })
export class AppRouter extends HTMLElement {
  private routes: TRouteObject[] | null = null;
  private isBasename: boolean = false;
  public connectedCallback() {
    const isBasenameAttr = this.hasAttribute("data-with-basename");
    this.isBasename = isBasenameAttr;
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
    this.init();
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

    const splitedPath = path.split("/").map((route) => `/${route}`);

    let route: TRouteObject | undefined;

    const initRoute = this.routes.find(
      (route) => !route.index && route.path === "/"
    );
    route = initRoute?.children?.find(
      (route) => !route.index && route.path === splitedPath[1]
    )
      ? initRoute
      : undefined;

    if (!route) {
      route = this.routes.find(
        (route) => !route.index && route.path === splitedPath[1]
      );
    }
    if (!route) return;

    const routeLayout = route?.element;
    if (routeLayout) {
      const layoutElem = document.createElement(routeLayout);
      this.innerHTML = "";
      this.appendChild(layoutElem);
      if (this.isBasename) {
        splitedPath.splice(0, 2);
      } else {
        splitedPath.shift();
      }
      console.log(splitedPath);
      console.log(this.routes);
      console.log(route);
      this.insertRouteChildren(route, splitedPath);

      if (searchParams) {
        this.querySelectorAll("[data-params]").forEach((elem) => {
          elem.setAttribute(
            "data-params",
            JSON.stringify(Object.fromEntries(searchParams.entries()))
          );
        });
      }
    } else {
      console.warn("Route not found:", path);
    }
  }
  private insertRouteChildren(route: TRouteObject, splitedPath: string[]) {
    let childRoute = route.children?.find(
      (route) => !route.index && route.path === splitedPath[0]
    );
    if (!childRoute) {
      childRoute = route.children?.find((route) => route.index);
    }
    if (!childRoute) return;

    this.replaceSlotWithChild(route.element, childRoute.element);
    if (!route.index) {
      splitedPath.shift();
    }

    this.insertRouteChildren(childRoute, splitedPath);
  }
  private replaceSlotWithChild(rootElement: string, element: string) {
    const childElement = document.createElement(element);
    const root = this.querySelector(rootElement);
    const slot = root?.querySelector("slot");
    slot?.replaceWith(childElement);
  }
}
