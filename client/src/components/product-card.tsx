import { Link } from "wouter";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@shared/schema";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const inCart = items.some((item) => item.productId === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <Card
        className="group overflow-visible border-card-border hover-elevate cursor-pointer"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative aspect-square overflow-hidden rounded-t-md bg-muted">
          <img
            src={product.images[0] || "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {product.featured && (
            <Badge className="absolute top-3 left-3" variant="default">
              Featured
            </Badge>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
              Sale
            </Badge>
          )}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              onClick={handleAddToCart}
              disabled={isAdding}
              data-testid={`button-add-to-cart-${product.id}`}
              className={inCart ? "bg-green-600 border-green-700" : ""}
            >
              {isAdding || inCart ? (
                <Check className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground line-clamp-1 mb-1" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem]">
            {product.description}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground" data-testid={`text-product-price-${product.id}`}>
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
