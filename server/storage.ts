import { 
  type User, type InsertUser, 
  type Category, type InsertCategory,
  type Product, type InsertProduct,
  type CartItem, type InsertCartItem,
  type Order, type InsertOrder
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getCartItems(sessionId: string): Promise<CartItem[]>;
  getCartItem(id: string): Promise<CartItem | undefined>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrdersBySession(sessionId: string): Promise<Order[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    
    this.seedData();
  }

  private seedData() {
    const categories: InsertCategory[] = [
      { name: "Furniture", slug: "furniture", description: "Handcrafted wooden furniture for your home", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" },
      { name: "Kitchenware", slug: "kitchenware", description: "Beautiful wooden kitchen essentials", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
      { name: "Decor", slug: "decor", description: "Decorative wooden pieces for any space", image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&q=80" },
      { name: "Toys", slug: "toys", description: "Safe and beautiful wooden toys for children", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&q=80" },
    ];

    categories.forEach(cat => {
      const id = randomUUID();
      this.categories.set(id, { ...cat, id });
    });

    const categoryIds = Array.from(this.categories.values());
    
    const products: InsertProduct[] = [
      {
        name: "Artisan Coffee Table",
        slug: "artisan-coffee-table",
        description: "A stunning handcrafted coffee table made from reclaimed oak wood. Each piece features unique grain patterns that tell a story of nature and craftsmanship.",
        price: 449.99,
        compareAtPrice: 549.99,
        categoryId: categoryIds[0].id,
        images: ["https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80", "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80"],
        materials: "Reclaimed Oak Wood, Natural Oil Finish",
        dimensions: "48\" x 24\" x 18\"",
        careInstructions: "Wipe with a dry cloth. Apply wood conditioner every 6 months.",
        craftingProcess: "Each table is hand-selected for grain quality, shaped using traditional joinery techniques, and finished with natural oils to enhance the wood's beauty.",
        inStock: true,
        featured: true,
      },
      {
        name: "Wooden Serving Board",
        slug: "wooden-serving-board",
        description: "Perfect for entertaining, this walnut serving board combines functionality with elegant design. Ideal for cheese, charcuterie, or appetizers.",
        price: 79.99,
        categoryId: categoryIds[1].id,
        images: ["https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80"],
        materials: "Black Walnut, Food-Safe Mineral Oil",
        dimensions: "18\" x 10\" x 1\"",
        careInstructions: "Hand wash only. Oil monthly for best results.",
        craftingProcess: "Carved from a single piece of black walnut and hand-finished with food-safe mineral oil.",
        inStock: true,
        featured: true,
      },
      {
        name: "Hand-Carved Wall Art",
        slug: "hand-carved-wall-art",
        description: "A breathtaking piece of wall art featuring intricate hand-carved patterns inspired by natural leaf formations.",
        price: 299.99,
        compareAtPrice: 399.99,
        categoryId: categoryIds[2].id,
        images: ["https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?w=800&q=80"],
        materials: "Teak Wood, Natural Stain",
        dimensions: "36\" x 24\" x 2\"",
        careInstructions: "Dust regularly with a soft cloth. Avoid direct sunlight.",
        craftingProcess: "Each pattern is hand-carved by skilled artisans, taking over 40 hours to complete.",
        inStock: true,
        featured: true,
      },
      {
        name: "Classic Wooden Blocks Set",
        slug: "classic-wooden-blocks",
        description: "A timeless set of 50 building blocks made from sustainably sourced maple. Perfect for developing creativity and motor skills.",
        price: 59.99,
        categoryId: categoryIds[3].id,
        images: ["https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&q=80"],
        materials: "Maple Wood, Non-Toxic Paint",
        dimensions: "Various sizes, Box: 12\" x 8\" x 6\"",
        careInstructions: "Wipe clean with a damp cloth. Store in a dry place.",
        craftingProcess: "Cut from solid maple, sanded smooth, and finished with child-safe, non-toxic paint.",
        inStock: true,
        featured: true,
      },
      {
        name: "Modern Dining Chair",
        slug: "modern-dining-chair",
        description: "Sleek and comfortable dining chair that combines Scandinavian design principles with traditional woodworking.",
        price: 189.99,
        categoryId: categoryIds[0].id,
        images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80"],
        materials: "White Oak, Natural Linen Seat",
        dimensions: "18\" x 20\" x 32\"",
        careInstructions: "Clean with mild soap and water. Condition wood annually.",
        craftingProcess: "Steam-bent wood with hand-woven linen seat cushion.",
        inStock: true,
        featured: false,
      },
      {
        name: "Wooden Utensil Set",
        slug: "wooden-utensil-set",
        description: "A complete set of kitchen utensils including spatula, spoon, and fork. Made from durable olive wood.",
        price: 45.99,
        categoryId: categoryIds[1].id,
        images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
        materials: "Olive Wood, Food-Safe Oil",
        dimensions: "12\" each",
        careInstructions: "Hand wash and dry immediately. Oil occasionally.",
        craftingProcess: "Hand-carved from Mediterranean olive wood for natural antibacterial properties.",
        inStock: true,
        featured: false,
      },
      {
        name: "Geometric Candle Holders",
        slug: "geometric-candle-holders",
        description: "Set of 3 geometric candle holders in varying heights. A modern accent for any room.",
        price: 89.99,
        categoryId: categoryIds[2].id,
        images: ["https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&q=80"],
        materials: "Beechwood, Matte Finish",
        dimensions: "4\", 6\", 8\" heights",
        careInstructions: "Keep away from open flames. Clean with dry cloth.",
        craftingProcess: "Precision-turned on a traditional lathe and hand-sanded to perfection.",
        inStock: true,
        featured: false,
      },
      {
        name: "Wooden Rocking Horse",
        slug: "wooden-rocking-horse",
        description: "A beloved classic, this handcrafted rocking horse will become a treasured heirloom for generations.",
        price: 249.99,
        categoryId: categoryIds[3].id,
        images: ["https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80"],
        materials: "Pine Wood, Natural Stain, Cotton Rope",
        dimensions: "24\" x 12\" x 20\"",
        careInstructions: "Wipe clean. Check all connections periodically.",
        craftingProcess: "Each horse is hand-carved and assembled using traditional dowel joinery.",
        inStock: true,
        featured: true,
      },
      {
        name: "Live Edge Bookshelf",
        slug: "live-edge-bookshelf",
        description: "A stunning floating shelf featuring the natural live edge of the wood. Each piece is unique.",
        price: 159.99,
        categoryId: categoryIds[0].id,
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80"],
        materials: "Walnut Wood, Steel Brackets",
        dimensions: "36\" x 10\" x 2\"",
        careInstructions: "Dust regularly. Apply wood oil every 6 months.",
        craftingProcess: "Cut to preserve the natural edge, kiln-dried, and finished with clear sealant.",
        inStock: true,
        featured: false,
      },
      {
        name: "Cutting Board Collection",
        slug: "cutting-board-collection",
        description: "Set of 3 beautifully crafted cutting boards in different sizes for all your kitchen needs.",
        price: 119.99,
        categoryId: categoryIds[1].id,
        images: ["https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80"],
        materials: "Maple, Walnut, Cherry Wood",
        dimensions: "Small: 10\"x8\", Medium: 14\"x10\", Large: 18\"x12\"",
        careInstructions: "Hand wash only. Apply mineral oil monthly.",
        craftingProcess: "Each board is made from end-grain wood for durability and knife-friendliness.",
        inStock: true,
        featured: false,
      },
      {
        name: "Wooden Picture Frame Set",
        slug: "wooden-picture-frame-set",
        description: "Set of 4 handcrafted picture frames in natural wood finish. Perfect for creating a gallery wall.",
        price: 79.99,
        compareAtPrice: 99.99,
        categoryId: categoryIds[2].id,
        images: ["https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&q=80"],
        materials: "Oak Wood, Glass",
        dimensions: "Two 5\"x7\", Two 8\"x10\"",
        careInstructions: "Dust with soft cloth. Clean glass with glass cleaner.",
        craftingProcess: "Corners are hand-joined using traditional miter joints for lasting durability.",
        inStock: true,
        featured: false,
      },
      {
        name: "Wooden Train Set",
        slug: "wooden-train-set",
        description: "Complete wooden train set with tracks, engine, and 4 cars. Hours of imaginative play.",
        price: 89.99,
        categoryId: categoryIds[3].id,
        images: ["https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&q=80"],
        materials: "Beech Wood, Non-Toxic Paint",
        dimensions: "Track Layout: 36\" x 24\"",
        careInstructions: "Wipe with damp cloth. Store indoors.",
        craftingProcess: "Each piece is precision-cut, sanded smooth, and painted with safe, vibrant colors.",
        inStock: true,
        featured: false,
      },
    ];

    products.forEach(prod => {
      const id = randomUUID();
      this.products.set(id, { ...prod, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(prod => prod.slug === slug);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(prod => prod.categoryId === categoryId);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(prod => prod.featured);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const newProduct: Product = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
  }

  async getCartItem(id: string): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }

  async addCartItem(item: InsertCartItem): Promise<CartItem> {
    const existing = Array.from(this.cartItems.values()).find(
      i => i.sessionId === item.sessionId && i.productId === item.productId
    );
    
    if (existing) {
      existing.quantity += item.quantity;
      return existing;
    }
    
    const id = randomUUID();
    const newItem: CartItem = { ...item, id };
    this.cartItems.set(id, newItem);
    return newItem;
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return undefined;
  }

  async removeCartItem(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const items = Array.from(this.cartItems.entries()).filter(
      ([, item]) => item.sessionId === sessionId
    );
    items.forEach(([id]) => this.cartItems.delete(id));
    return true;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const newOrder: Order = { ...order, id };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersBySession(sessionId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.sessionId === sessionId);
  }
}

export const storage = new MemStorage();
