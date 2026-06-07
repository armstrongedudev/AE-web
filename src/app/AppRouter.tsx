import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useInternalLinks } from "../hooks/useInternalLinks";

import MarketingLayout from "./layouts/MarketingLayout";
import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "../pages/marketing/Home";
import About from "../pages/marketing/About";
import Speaking from "../pages/marketing/Speaking";
import Programs from "../pages/marketing/Programs";
import ProgramDetail from "../pages/marketing/ProgramDetail";
import Certification from "../pages/marketing/Certification";
import Reviews from "../pages/marketing/Reviews";
import Pricing from "../pages/marketing/Pricing";
import Contact from "../pages/marketing/Contact";
import Blog from "../pages/marketing/Blog";
import BlogPost from "../pages/marketing/BlogPost";
import Faq from "../pages/marketing/Faq";

import Login from "../pages/auth/Login";
import AppDashboard from "../pages/app/Dashboard";
import Account from "../pages/app/Account";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminQuotes from "../pages/admin/Quotes";
import AdminContacts from "../pages/admin/Contacts";
import AdminBookings from "../pages/admin/Bookings";
import AdminBookingDetail from "../pages/admin/BookingDetail";
import AdminCatalog from "../pages/admin/Catalog";
import AdminPricingConfig from "../pages/admin/PricingConfig";
import AdminContent from "../pages/admin/Content";

import NotFound from "../pages/NotFound";
import DocsApp from "../docs/DocsApp";

/** Side-effects that must run inside the Router: SPA link interception + scroll reset. */
function RouteEffects() {
  useInternalLinks();
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.startsWith("/docs")) window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Routes>
        {/* Public marketing */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/certification" element={<Certification />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Client area */}
        <Route element={<AppLayout />}>
          <Route path="/app" element={<AppDashboard />} />
          <Route path="/app/account" element={<Account />} />
        </Route>

        {/* Owner CMS */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/quotes" element={<AdminQuotes />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/bookings/:id" element={<AdminBookingDetail />} />
          <Route path="/admin/catalog" element={<AdminCatalog />} />
          <Route path="/admin/pricing" element={<AdminPricingConfig />} />
          <Route path="/admin/content" element={<AdminContent />} />
        </Route>

        {/* Design-system documentation (its own hash-routed SPA) */}
        <Route path="/docs/*" element={<DocsApp />} />
      </Routes>
    </BrowserRouter>
  );
}
