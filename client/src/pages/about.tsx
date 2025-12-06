import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Leaf, Shield, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion for Craft",
    description: "Every piece is made with love, dedication, and attention to detail that comes from generations of woodworking tradition.",
  },
  {
    icon: Leaf,
    title: "Sustainable Sourcing",
    description: "We source our wood from responsibly managed forests, ensuring our craft doesn't come at the expense of the environment.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Each product undergoes rigorous quality checks. We stand behind every item with our lifetime craftsmanship warranty.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We support local artisans and their families, preserving traditional skills while building a sustainable future.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl">
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white leading-tight mb-4">
              Our Story
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              A journey of passion, tradition, and craftsmanship that spans generations.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-6">
                Where Tradition Meets Modern Living
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Chataru Craft was born from a simple belief: that the warmth and beauty of
                  handcrafted wooden products can transform any space into a home. Our journey
                  began in a small workshop where the art of woodworking was passed down
                  through generations.
                </p>
                <p>
                  Today, we work with a collective of skilled artisans who share our
                  commitment to excellence. Each piece in our collection tells a story - of
                  carefully selected wood, of patient hands shaping raw materials, and of the
                  timeless techniques that bring beauty to life.
                </p>
                <p>
                  We believe that in a world of mass production, there's something special
                  about owning a piece that was made by human hands, with care and intention.
                  That's the Chataru Craft difference.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80"
                  alt="Artisan at work in the workshop"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do, from sourcing to crafting to delivery.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border-card-border">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
                  alt="Wood grain detail"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden mt-8">
                <img
                  src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80"
                  alt="Finished wooden product"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&q=80"
                  alt="Workshop tools"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden mt-8">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"
                  alt="Wooden furniture"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-6">
                The Making of Quality
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Each product begins its journey as carefully selected wood from sustainable
                  sources. Our artisans inspect every piece for grain quality, color, and
                  character.
                </p>
                <p>
                  The crafting process combines time-honored techniques with modern precision.
                  From initial shaping to final finishing, multiple hands touch each piece,
                  ensuring it meets our exacting standards.
                </p>
                <p>
                  The result is a product that's not just functional, but a work of art -
                  one that will grow more beautiful with age and become a treasured part
                  of your home.
                </p>
              </div>
              <Link href="/shop" className="inline-block mt-8">
                <Button size="lg" data-testid="button-shop-collection">
                  Shop Our Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
