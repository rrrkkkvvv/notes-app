import type { ICreateRouter } from "./types";

export const createRouter: ICreateRouter = ({ routes, basename }) => {
  if (basename) {
    const updatedRoutes = routes.map((route) => {
      if (route.index) return route;
      return {
        ...route,
        path: route.path !== "/" ? `${basename}${route.path}` : basename,
      };
    });
    const goTo = (path: string) => {
      const state = { route: path !== "/" ? `${basename}${path}` : basename };
      history.pushState(
        state,
        "",
        path !== "/" ? `${basename}${path}` : basename
      );
      const popStateEvent = new PopStateEvent("popstate", { state: state });
      dispatchEvent(popStateEvent);
    };
    return { router: JSON.stringify(updatedRoutes), goTo };
  }
  const goTo = (path: string) => {
    const state = { route: path };
    history.pushState(state, "", path);
    const popStateEvent = new PopStateEvent("popstate", { state: state });
    dispatchEvent(popStateEvent);
  };

  return { router: JSON.stringify(routes), goTo };
};
