export type TRoutes = {
  [path: string]: HTMLElement;
};
export type TRouteObject = {
  path: string;
  index?: boolean;
  element: HTMLElement;
  children?: TChildrenRouteObject[];
};
type TChildrenRouteObject = TRouteObject & { index?: boolean };

export type ICreateRouter = (args: {
  routes: TRouteObject[];
  basename?: string;
}) => TRouteObject[];
