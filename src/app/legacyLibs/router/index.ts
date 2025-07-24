type TRoute = {
  [key: string]: { layout: string };
};

const routes: TRoute = {
  "/": { layout: "notes-page" },
  "/todos-page": { layout: "todos-page" },
};

export class Router {
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
    const route = routes[path];
    if (route) {
      const root = document.querySelector("#app") as HTMLElement;
      root.innerHTML = "";
      const layout = document.createElement(route.layout);
      if (searchParams) {
        layout.setAttribute(
          "data-params",
          JSON.stringify(Object.fromEntries(searchParams.entries()))
        );
      }

      root.appendChild(layout);
    } else {
      console.warn("Route not found:", path);
    }
  }
}

export const router = new Router();
