import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80"
                alt="Artisan crafting wooden products in workshop"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-lg overflow-hidden shadow-xl hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80"
                alt="Close-up of handcrafted wooden detail"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:pl-8">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mt-2 mb-6">
              Crafted with Passion, Made to Last
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                At Chataru Craft, we believe in the timeless beauty of handcrafted wooden products.
                Each piece in our collection is carefully made by skilled artisans who have
                inherited their craft through generations.
              </p>
              <p>
                We source our wood from sustainable forests, ensuring that every purchase
                supports both traditional craftsmanship and environmental responsibility.
                Our commitment to quality means that each item is not just a product, but a
                piece of art that will last for generations.
              </p>
              <p>
                From functional kitchenware to decorative pieces, every item tells a story
                of dedication, skill, and love for the craft.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/about">
                <Button data-testid="button-learn-more">Learn More About Us</Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline" data-testid="button-explore-collection">
                  Explore Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
