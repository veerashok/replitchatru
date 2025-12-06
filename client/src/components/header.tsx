import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openCart, totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-nav-mobile-${link.label.toLowerCase()}`}
                    >
                      <span
                        className={`block py-2 text-lg font-medium transition-colors hover-elevate active-elevate-2 rounded-md px-3 ${
                          location === link.href
                            ? "text-foreground bg-accent"
                            : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" data-testid="link-logo">
              <span className="font-serif text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                Chataru<span className="text-primary">Craft</span>
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase()}`}>
                <span
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover-elevate active-elevate-2 ${
                    location === link.href
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-40 sm:w-64"
                  data-testid="input-search"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                  data-testid="button-close-search"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  data-testid="button-open-search"
                  className="hidden sm:flex"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={openCart}
                  className="relative"
                  data-testid="button-cart"
                  aria-label={`Shopping cart, ${totalItems} items`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge
                      variant="default"
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {totalItems > 99 ? "99+" : totalItems}
                    </Badge>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
