import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@shared/schema";

interface FeaturedCategoriesProps {
  categories: Category[];
}

const categoryImages: Record<string, string> = {
  furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  decor: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&q=80",
  kitchenware: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  toys: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&q=80",
};

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  if (categories.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handcrafted collections, each piece made with care and tradition.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/shop?category=${category.slug}`}>
              <Card
                className="group overflow-visible border-card-border hover-elevate cursor-pointer"
                data-testid={`card-category-${category.slug}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-md">
                  <img
                    src={category.image || categoryImages[category.slug] || "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80"}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-serif text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description || `Explore our ${category.name.toLowerCase()} collection`}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
