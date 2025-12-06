import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Minus, Plus, ShoppingBag, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, openCart } = useCart();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", slug],
  });

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);
    addItem(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-6 w-32 mb-8" />
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded-md" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Product not found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/shop">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images.length > 0 
    ? product.images 
    : ["https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800"];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/shop">
          <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-to-shop">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
                data-testid="img-product-main"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? "border-primary" : "border-transparent"
                    }`}
                    data-testid={`button-thumbnail-${i}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              {product.featured && (
                <Badge className="mb-3" variant="default">
                  Featured
                </Badge>
              )}
              <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground" data-testid="text-product-title">
                {product.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl lg:text-3xl font-semibold text-foreground" data-testid="text-product-price">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                  <Badge variant="destructive">
                    {Math.round((1 - product.price / product.compareAtPrice) * 100)}% Off
                  </Badge>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
              {product.description}
            </p>

            {product.materials && (
              <div>
                <span className="text-sm font-medium text-foreground">Materials: </span>
                <span className="text-sm text-muted-foreground">{product.materials}</span>
              </div>
            )}

            {product.dimensions && (
              <div>
                <span className="text-sm font-medium text-foreground">Dimensions: </span>
                <span className="text-sm text-muted-foreground">{product.dimensions}</span>
              </div>
            )}

            <Separator />

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  data-testid="button-quantity-decrease"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium" data-testid="text-quantity">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-quantity-increase"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                data-testid="button-add-to-cart"
              >
                {isAdding ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            {!product.inStock && (
              <p className="text-destructive text-sm font-medium">
                This item is currently out of stock
              </p>
            )}

            <Accordion type="single" collapsible className="w-full">
              {product.craftingProcess && (
                <AccordionItem value="crafting">
                  <AccordionTrigger data-testid="accordion-crafting">
                    Crafting Process
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{product.craftingProcess}</p>
                  </AccordionContent>
                </AccordionItem>
              )}
              {product.careInstructions && (
                <AccordionItem value="care">
                  <AccordionTrigger data-testid="accordion-care">
                    Care Instructions
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{product.careInstructions}</p>
                  </AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="shipping">
                <AccordionTrigger data-testid="accordion-shipping">
                  Shipping Information
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Free shipping on orders over $100.</p>
                    <p>Standard shipping: 5-7 business days.</p>
                    <p>Express shipping: 2-3 business days.</p>
                    <p>All items are carefully wrapped to ensure safe delivery.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
