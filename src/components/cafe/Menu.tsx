import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Coffee, Cake, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import menu images
import espressoImg from "@/assets/menu/espresso.jpg";
import latteImg from "@/assets/menu/latte.jpg";
import coldbrewImg from "@/assets/menu/coldbrew.jpg";
import croissantImg from "@/assets/menu/croissant.jpg";
import chocolateCakeImg from "@/assets/menu/chocolate-cake.jpg";
import matchaImg from "@/assets/menu/matcha.jpg";

type Category = "all" | "coffee" | "pastries" | "specialty";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  category: Category;
  popular?: boolean;
}

const menuItems: MenuItem[] = [
  { name: "Chapter One Espresso", description: "Rich, bold, and perfectly balanced", price: "₹199", image: espressoImg, category: "coffee", popular: true },
  { name: "Velvet Latte", description: "Smooth espresso with silky steamed milk", price: "₹249", image: latteImg, category: "coffee", popular: true },
  { name: "Cold Brew Classic", description: "24-hour steeped, served over ice", price: "₹229", image: coldbrewImg, category: "coffee" },
  { name: "Cappuccino", description: "Equal parts espresso, steamed milk, foam", price: "₹219", image: latteImg, category: "coffee" },
  { name: "Americano", description: "Bold espresso with hot water", price: "₹179", image: espressoImg, category: "coffee" },
  { name: "Caramel Macchiato", description: "Vanilla, espresso, caramel drizzle", price: "₹279", image: latteImg, category: "coffee", popular: true },
  { name: "Butter Croissant", description: "Flaky, golden, freshly baked", price: "₹149", image: croissantImg, category: "pastries", popular: true },
  { name: "Almond Danish", description: "Sweet almond cream, sliced almonds", price: "₹169", image: croissantImg, category: "pastries" },
  { name: "Chocolate Éclair", description: "Cream-filled with dark chocolate", price: "₹189", image: chocolateCakeImg, category: "pastries" },
  { name: "Blueberry Muffin", description: "Loaded with fresh blueberries", price: "₹129", image: croissantImg, category: "pastries" },
  { name: "Chocolate Truffle Cake", description: "Rich Belgian chocolate layers", price: "₹299", image: chocolateCakeImg, category: "pastries", popular: true },
  { name: "Red Velvet Slice", description: "Classic cream cheese frosting", price: "₹279", image: chocolateCakeImg, category: "pastries" },
  { name: "Matcha Oat Latte", description: "Ceremonial grade matcha, oat milk", price: "₹279", image: matchaImg, category: "specialty", popular: true },
  { name: "Chai Spice Latte", description: "House-made chai blend, steamed milk", price: "₹249", image: matchaImg, category: "specialty" },
  { name: "Golden Turmeric", description: "Turmeric, ginger, honey, oat milk", price: "₹249", image: matchaImg, category: "specialty" },
  { name: "Hot Chocolate Luxe", description: "Belgian chocolate, whipped cream", price: "₹229", image: chocolateCakeImg, category: "specialty" },
  { name: "Rose Cardamom Latte", description: "Aromatic rose with cardamom spice", price: "₹269", image: matchaImg, category: "specialty", popular: true },
  { name: "Affogato", description: "Espresso over vanilla gelato", price: "₹299", image: espressoImg, category: "specialty" },
];

const categories = [
  { id: "all" as Category, label: "All Items", icon: null },
  { id: "coffee" as Category, label: "Coffee", icon: Coffee },
  { id: "pastries" as Category, label: "Pastries", icon: Cake },
  { id: "specialty" as Category, label: "Specialty", icon: Leaf },
];

const Menu = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="bg-card py-16 lg:py-20">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <span className="mb-4 inline-block font-sans text-sm uppercase tracking-[0.2em] text-accent">
            Discover
          </span>
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground lg:text-5xl">
            Our Menu
          </h2>
          <div className="section-divider mb-6" />
          <p className="mx-auto max-w-2xl font-sans text-muted-foreground">
            From expertly crafted coffee to freshly baked pastries, explore our 
            carefully curated selection designed to delight your senses.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "hero" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-2"
            >
              {cat.icon && <cat.icon className="h-4 w-4" />}
              {cat.label}
            </Button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="card-hover group relative overflow-hidden rounded-xl bg-background"
            >
              {/* Image */}
              <div className="img-zoom relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {item.popular && (
                  <div className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    Popular
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                    {item.name}
                  </h3>
                  <span className="ml-2 whitespace-nowrap font-serif text-lg font-bold text-accent">
                    {item.price}
                  </span>
                </div>
                <p className="font-sans text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;
