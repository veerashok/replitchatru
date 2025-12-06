import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      
      <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-xl">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
            Handcrafted with
            <span className="block text-amber-400">Love & Tradition</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
            Discover our collection of artisan wooden crafts, each piece carefully made
            to bring warmth and natural beauty to your home.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop">
              <Button
                size="lg"
                className="backdrop-blur-md bg-primary border-primary-border text-primary-foreground"
                data-testid="button-hero-shop"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="backdrop-blur-md bg-white/10 border-white/30 text-white"
                data-testid="button-hero-story"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
