import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import type { MenuItem } from "../../shared/schema";

export default function Order() {
  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({ queryKey: ["/api/menu"] });
  const { addItem, itemCount } = useCart();
  const { toast } = useToast();

  const categories = ["tacos", "burgers", "salads", "desserts"];

  const handleAddToCart = (item: MenuItem) => {
    addItem(item, 1);
    toast({
      title: "Ajouté au panier",
      description: `${item.name} a été ajouté à votre panier`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-2xl">Chargement du menu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            TACOS <span className="text-red-600">AVENUE</span>
          </Link>
          <Link to="/cart" data-testid="button-cart">
            <Button className="bg-red-600 hover:bg-red-700">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Panier ({itemCount})
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            SAVOUREZ NOS <span className="text-red-600">DÉLICES</span>
          </h1>
          <p className="text-gray-400 text-lg">Commandez en ligne - Livraison ou à emporter</p>
        </div>

        {categories.map((category) => {
          const items = menuItems?.filter((item) => item.category === category && item.isAvailable);
          if (!items?.length) return null;

          return (
            <div key={category} className="mb-16">
              <h2 className="text-3xl font-bold mb-8 uppercase text-white">
                {category === "tacos" && "🌮 Tacos"}
                {category === "burgers" && "🍔 Burgers"}
                {category === "salads" && "🥗 Salades"}
                {category === "desserts" && "🍰 Desserts & Accompagnements"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                  <Card key={item.id} className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-red-600 transition-all" data-testid={`card-menu-${item.id}`}>
                    {item.imageUrl && (
                      <div className="h-56 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          data-testid={`img-menu-${item.id}`}
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-white text-xl" data-testid={`text-name-${item.id}`}>{item.name}</CardTitle>
                        {item.rating && item.rating > 0 && (
                          <Badge className="bg-yellow-600" data-testid={`badge-rating-${item.id}`}>
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            {item.rating}
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-gray-400" data-testid={`text-description-${item.id}`}>
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-red-600" data-testid={`text-price-${item.id}`}>
                        {item.price.toFixed(2)}€
                      </span>
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="bg-red-600 hover:bg-red-700"
                        data-testid={`button-add-${item.id}`}
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Ajouter
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
