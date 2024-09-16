import ExploreCategories from "@/components/ExploreCategories";
import Hero from "@/components/Hero";
import Header from "@/components/header"
import Footer from "@/components/footer";
import ProductShowcase from "@/components/products-preview";

export default function Home() {
  return (
    <>
    <Header />
    <Hero />
    <ExploreCategories/>
    <ProductShowcase/>
    <Footer/>
    </>
  );
}
