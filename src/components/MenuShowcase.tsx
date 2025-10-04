import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import burritoImage from "@/assets/food-burrito.jpg";
import friesImage from "@/assets/food-fries.jpg";
import { ChevronRight } from "lucide-react";

const MenuShowcase = () => {
  const items = [
    {
      title: "Signature Burritos",
      description: "Packed with premium ingredients and authentic flavors",
      image: burritoImage,
    },
    {
      title: "Loaded Fries",
      description: "Crispy golden fries topped with savory goodness",
      image: friesImage,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Our <span className="text-primary">Menu</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every dish is crafted with passion and authentic recipes passed down through generations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {items.map((item, index) => (
            <Card 
              key={index} 
              className="overflow-hidden group cursor-pointer border-2 hover:border-primary transition-[var(--transition-smooth)] shadow-[var(--shadow-card)]"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="text-lg">
            View Full Menu
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuShowcase;
