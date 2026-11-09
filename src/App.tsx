import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FaqPage from "@/pages/FaqPage";
import Features from "@/pages/Features";
import HowItWorks from "@/pages/HowItWorks";
import MathiPage from "@/pages/MathiPage";
import PrivacyPage from "@/pages/PrivacyPage";
import Pricing from "@/pages/Pricing";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import DeleteAccount from "@/pages/DeleteAccount";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="mathi" element={<MathiPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="terms-and-conditions" element={<Terms />} />
        <Route path="delete-account" element={<DeleteAccount />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
