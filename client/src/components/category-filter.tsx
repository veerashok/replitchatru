import { Button } from "@/components/ui/button";
import type { Category } from "@shared/schema";

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onSelect: (categoryId: string | null) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        variant={selected === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelect(null)}
        data-testid="button-filter-all"
      >
        All Products
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selected === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(category.id)}
          data-testid={`button-filter-${category.slug}`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
