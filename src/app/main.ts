import "../shared/ui/index.ts";
import "../entities/index.ts";
import "../features/index.ts";
import "../pages/index.ts";
import "./router/router.ts";
import "./style.css";
import { createRouter } from "./router/createRouter.ts";
const { router, goTo } = createRouter({
  basename: "/notes-app",
  routes: [
    {
      path: "/",
      element: "page-wrapper",
      children: [
        {
          index: true,
          element: "notes-page",
        },
        {
          path: "/notes",
          element: "notes-page",
        },
        {
          path: "/todos",
          element: "todos-page",
        },
      ],
    },
  ],
});
export { goTo };
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <app-router data-with-basename  data-router='${router}'></app-router>
 `;
// data-with-basename
