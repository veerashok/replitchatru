import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="font-serif text-8xl font-bold text-primary/20 mb-4">404</h1>
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been
          moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => window.history.back()} data-testid="button-go-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Link href="/">
            <Button data-testid="button-go-home-404">
              <Home className="h-4 w-4 mr-2" />
              Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
