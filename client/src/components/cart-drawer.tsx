import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/lib/cart-context";

export function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, subtotal, totalItems } = useCart();

  const shippingEstimate = subtotal >= 100 ? 0 : 12.99;
  const total = subtotal + shippingEstimate;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Looks like you haven't added any items yet.
            </p>
            <Link href="/shop">
              <Button onClick={closeCart} data-testid="button-start-shopping">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                    data-testid={`cart-item-${item.productId}`}
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <img
                        src={item.product.images[0] || "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200"}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-foreground line-clamp-1">
                          {item.product.name}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 -mr-2"
                          onClick={() => removeItem(item.productId)}
                          data-testid={`button-remove-${item.productId}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-auto">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          data-testid={`button-decrease-${item.productId}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm" data-testid={`text-quantity-${item.productId}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          data-testid={`button-increase-${item.productId}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <span className="ml-auto font-medium text-sm">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium" data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shippingEstimate === 0 ? (
                      <span className="text-green-600 dark:text-green-500">Free</span>
                    ) : (
                      `$${shippingEstimate.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shippingEstimate > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over $100
                  </p>
                )}
                <Separator />
                <div className="flex justify-between text-base font-medium">
                  <span>Total</span>
                  <span data-testid="text-total">${total.toFixed(2)}</span>
                </div>
              </div>

              <SheetFooter className="gap-2 sm:flex-col">
                <Link href="/checkout" className="w-full">
                  <Button className="w-full" size="lg" onClick={closeCart} data-testid="button-checkout">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={closeCart} data-testid="button-continue-shopping">
                  Continue Shopping
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
