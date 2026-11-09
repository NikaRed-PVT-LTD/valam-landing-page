import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { findRoute, getRoutes, headHtml } from "./lib/seo";

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
  return { html, head: headHtml(findRoute(url)) };
}

export const routes = () => getRoutes();
export { headHtml };
