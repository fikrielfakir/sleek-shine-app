import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import tacosImage from "@/assets/food-tacos-grid.jpg";
import burgerImage from "@/assets/food-burger.jpg";
import saladImage from "@/assets/food-salad.jpg";
import dessertImage from "@/assets/food-dessert.jpg";
import { ShoppingCart } from "lucide-react";

const MenuShowcase = () => {
  const categories = [
    {
      title: "Tacos",
      description: "Le vrai goût français – viande, fromage, sauce unique",
      image: tacosImage,
      price: "8.50€",
      accentColor: "hsl(var(--primary))",
    },
    {
      title: "Burgers",
      description: "Pain brioche, steaks juteux, cheddar fondant",
      image: burgerImage,
      price: "9.90€",
      accentColor: "hsl(var(--accent))",
    },
    {
      title: "Salades",
      description: "Fraîcheur et saveur – poulet grillé, légumes croquants",
      image: saladImage,
      price: "7.50€",
      accentColor: "hsl(var(--neon-green))",
    },
    {
      title: "Desserts",
      description: "Douceur gourmande pour finir en beauté",
      image: dessertImage,
      price: "4.50€",
      accentColor: "hsl(var(--neon-pink))",
    },
  ];

  return (
    <section className="py-24 bg-secondary/50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase">
            Notre
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Menu
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground font-bold">
            Faites votre choix, régalez-vous
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="overflow-hidden group bg-card border-2 border-border hover:border-[var(--hover-color)] transition-all duration-300 shadow-[var(--shadow-card)]"
              style={{ "--hover-color": category.accentColor } as React.CSSProperties}
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Price Badge */}
                <div 
                  className="absolute top-4 right-4 px-6 py-3 rounded-full font-black text-2xl text-black"
                  style={{ backgroundColor: category.accentColor }}
                >
                  {category.price}
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 
                  className="text-3xl font-black mb-3 uppercase"
                  style={{ color: category.accentColor }}
                >
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-base">
                  {category.description}
                </p>
                <Button 
                  variant="default" 
                  className="w-full"
                  style={{ 
                    backgroundColor: category.accentColor,
                    color: category.accentColor === "hsl(var(--accent))" || category.accentColor === "hsl(var(--neon-green))" ? "black" : "white"
                  }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Commander
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="hero" size="lg" className="text-2xl px-12">
            Voir le menu complet
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuShowcase;
