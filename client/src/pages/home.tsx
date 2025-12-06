import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/hero";
import { FeaturedProducts } from "@/components/featured-products";
import { FeaturedCategories } from "@/components/featured-categories";
import { AboutSection } from "@/components/about-section";
import { Newsletter } from "@/components/newsletter";
import type { Product, Category } from "@shared/schema";

export default function Home() {
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", "featured"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div>
      <Hero />
      <FeaturedCategories categories={categories} />
      <FeaturedProducts products={featuredProducts} isLoading={productsLoading} />
      <AboutSection />
      <Newsletter />
    </div>
  );
}
