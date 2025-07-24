export type TRoutes = {
  [path: string]: HTMLElement;
};
export type TRouteObject = TIndexedRouteObject | TNonIndexedRouteObject;
type TIndexedRouteObject = {
  index: true;
  element: string;
  children?: undefined;
};
type TNonIndexedRouteObject = {
  index?: false;

  path: string;
  element: string;
  children?: TRouteObject[];
};
// | (Omit<TRouteObject, "path"> & { index?: boolean })
// | { path: string };

export type ICreateRouter = (args: {
  routes: TRouteObject[];
  basename?: string;
}) => { router: string; goTo: (path: string) => void };
