import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Thanks for subscribing!",
      description: "You'll receive our latest updates and offers.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 lg:py-20 bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-foreground mb-4">
          Join Our Community
        </h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
          Subscribe to receive updates about new products, special offers, and 
          stories from our workshop.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-white/20"
            required
            data-testid="input-newsletter-email"
          />
          <Button
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
            data-testid="button-newsletter-subscribe"
          >
            {isSubmitting ? (
              "Subscribing..."
            ) : (
              <>
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
