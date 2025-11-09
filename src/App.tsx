import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import Category from "./pages/Category";
import Subcategory from "./pages/Subcategory";
import Cart from "./pages/Cart";
import Rewards from "./pages/Rewards";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import LikedProducts from "./pages/LikedProducts";
import ProductDemo from "./pages/ProductDemo";
import ShopNew from "./pages/ShopNew";
import ShopBestsellers from "./pages/ShopBestsellers";
import ShopSale from "./pages/ShopSale";
import GiftCards from "./pages/GiftCards";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Story from "./pages/Story";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import UMayLike from "./pages/UMayLike";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/search" element={<Search />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/subcategory/:id" element={<Subcategory />} />
            <Route path="/shop/new" element={<ShopNew />} />
            <Route path="/shop/bestsellers" element={<ShopBestsellers />} />
            <Route path="/shop/sale" element={<ShopSale />} />
            <Route path="/shop/gift-cards" element={<GiftCards />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/story" element={<Story />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/u-may-like" element={<UMayLike />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/liked" element={<LikedProducts />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/product-demo" element={<ProductDemo />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
