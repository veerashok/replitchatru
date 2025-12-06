import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "wouter";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product-grid";
import { CategoryFilter } from "@/components/category-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Product, Category } from "@shared/schema";

type SortOption = "newest" | "price-asc" | "price-desc" | "name";

export default function Shop() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const categorySlug = params.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const category = useMemo(() => {
    if (categorySlug) {
      return categories.find((c) => c.slug === categorySlug) || null;
    }
    return selectedCategory ? categories.find((c) => c.id === selectedCategory) || null : null;
  }, [categorySlug, selectedCategory, categories]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (category) {
      filtered = filtered.filter((p) => p.categoryId === category.id);
    } else if (selectedCategory) {
      filtered = filtered.filter((p) => p.categoryId === selectedCategory);
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        break;
    }

    return filtered;
  }, [products, category, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 border-b border-border py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
            {category ? category.name : "All Products"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {category
              ? category.description || `Browse our ${category.name.toLowerCase()} collection`
              : "Explore our handcrafted wooden products"}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-medium text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  <Button
                    variant={!selectedCategory && !categorySlug ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                    data-testid="button-category-all"
                  >
                    All Products
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={
                        selectedCategory === cat.id || categorySlug === cat.slug
                          ? "default"
                          : "ghost"
                      }
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(cat.id)}
                      data-testid={`button-category-${cat.slug}`}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </p>
              
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="sm" data-testid="button-filters">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <div>
                        <h3 className="font-medium text-foreground mb-4">Categories</h3>
                        <div className="space-y-2">
                          <Button
                            variant={!selectedCategory ? "default" : "ghost"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => setSelectedCategory(null)}
                          >
                            All Products
                          </Button>
                          {categories.map((cat) => (
                            <Button
                              key={cat.id}
                              variant={selectedCategory === cat.id ? "default" : "ghost"}
                              size="sm"
                              className="w-full justify-start"
                              onClick={() => setSelectedCategory(cat.id)}
                            >
                              {cat.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[160px]" data-testid="select-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <ProductGrid products={filteredProducts} isLoading={productsLoading} />
          </main>
        </div>
      </div>
    </div>
  );
}
