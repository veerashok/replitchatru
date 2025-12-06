import { Link } from "wouter";
import { SiFacebook, SiInstagram, SiPinterest, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Furniture", href: "/shop?category=furniture" },
    { label: "Kitchenware", href: "/shop?category=kitchenware" },
    { label: "Decor", href: "/shop?category=decor" },
    { label: "Toys", href: "/shop?category=toys" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "FAQs", href: "/faqs" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Blog", href: "/blog" },
  ],
};

const socialLinks = [
  { icon: SiFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: SiInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: SiPinterest, href: "https://pinterest.com", label: "Pinterest" },
  { icon: SiX, href: "https://x.com", label: "X" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-semibold text-foreground">
                Chataru<span className="text-primary">Craft</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Handcrafted wooden products made with love and tradition. Each piece is unique
              and made to last for generations.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Chataru Craft. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="Mastercard"
              className="h-6 opacity-60"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-4 opacity-60"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-5 opacity-60"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
