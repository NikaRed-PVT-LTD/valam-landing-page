import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Seo } from "./Seo";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <Seo />
      <ScrollManager />
      <Header />
      <main id="content"><Outlet /></main>
      <Footer />
    </>
  );
}
