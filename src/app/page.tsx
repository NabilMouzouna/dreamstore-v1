import { ClerkProvider } from '@clerk/nextjs'
import ExploreCategories from "@/components/ExploreCategories";
import Hero from "@/components/Hero";
import Header from "@/components/header"
import Footer from "@/components/footer";
import ProductShowcase from "@/components/products-preview";

export default function MyApp() {
  return (
    <ClerkProvider
      signInForceRedirectUrl="/dashboard" 
      signUpForceRedirectUrl="/dashboard"    
    >
      <Header />
      <Hero />
      <ExploreCategories />
      <ProductShowcase />
      <Footer />
    </ClerkProvider>
  );
}