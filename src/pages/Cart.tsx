import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [orderType, setOrderType] = useState<"delivery" | "pickup" | "dine-in">("delivery");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");

  const deliveryFee = orderType === "delivery" ? 3.50 : 0;
  const finalTotal = total + deliveryFee;

  const placeOrderMutation = useMutation({
    mutationFn: async () => {
      const orderData = {
        customerName,
        customerPhone,
        customerEmail,
        deliveryAddress: orderType === "delivery" ? deliveryAddress : undefined,
        orderType,
        subtotal: total,
        deliveryFee,
        total: finalTotal,
        notes,
        status: "pending",
        items: items.map((item) => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity,
          price: item.menuItem.price,
          notes: item.notes,
        })),
      };

      const response = await apiRequest("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Commande confirmée!",
        description: "Votre commande a été enregistrée avec succès.",
      });
      clearCart();
      navigate("/");
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de passer la commande. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const handleCheckout = () => {
    if (!customerName || !customerPhone) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir votre nom et numéro de téléphone.",
        variant: "destructive",
      });
      return;
    }

    if (orderType === "delivery" && !deliveryAddress) {
      toast({
        title: "Adresse manquante",
        description: "Veuillez entrer votre adresse de livraison.",
        variant: "destructive",
      });
      return;
    }

    placeOrderMutation.mutate();
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Votre panier est vide</h2>
          <Link to="/order">
            <Button className="bg-red-600 hover:bg-red-700" data-testid="button-order">
              Voir le menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/order" className="inline-flex items-center text-white hover:text-red-600" data-testid="link-back">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Retour au menu
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">VOTRE <span className="text-red-600">PANIER</span></h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.menuItem.id} className="bg-zinc-900 border-zinc-800" data-testid={`card-cart-${item.menuItem.id}`}>
                <CardContent className="flex items-center gap-4 p-6">
                  {item.menuItem.imageUrl && (
                    <img
                      src={item.menuItem.imageUrl}
                      alt={item.menuItem.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white" data-testid={`text-cart-name-${item.menuItem.id}`}>{item.menuItem.name}</h3>
                    <p className="text-gray-400">{item.menuItem.price.toFixed(2)}€</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                      className="border-zinc-700"
                      data-testid={`button-decrease-${item.menuItem.id}`}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-bold" data-testid={`text-quantity-${item.menuItem.id}`}>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                      className="border-zinc-700"
                      data-testid={`button-increase-${item.menuItem.id}`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-red-600" data-testid={`text-cart-total-${item.menuItem.id}`}>
                      {(item.menuItem.price * item.quantity).toFixed(2)}€
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.menuItem.id)}
                      className="text-red-600 hover:text-red-700"
                      data-testid={`button-remove-${item.menuItem.id}`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card className="bg-zinc-900 border-zinc-800 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white">Informations de commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    data-testid="input-phone"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email (optionnel)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label>Type de commande</Label>
                  <RadioGroup value={orderType} onValueChange={(value: any) => setOrderType(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" data-testid="radio-delivery" />
                      <Label htmlFor="delivery">Livraison (+3.50€)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" data-testid="radio-pickup" />
                      <Label htmlFor="pickup">À emporter</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dine-in" id="dine-in" data-testid="radio-dinein" />
                      <Label htmlFor="dine-in">Sur place</Label>
                    </div>
                  </RadioGroup>
                </div>

                {orderType === "delivery" && (
                  <div>
                    <Label htmlFor="address">Adresse de livraison *</Label>
                    <Textarea
                      id="address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      data-testid="input-address"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Allergies, préférences de cuisson..."
                    className="bg-zinc-800 border-zinc-700 text-white"
                    data-testid="input-notes"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-700 space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span data-testid="text-subtotal">{total.toFixed(2)}€</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span>Frais de livraison</span>
                      <span data-testid="text-delivery-fee">{deliveryFee.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-red-600">
                    <span>Total</span>
                    <span data-testid="text-final-total">{finalTotal.toFixed(2)}€</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleCheckout}
                  disabled={placeOrderMutation.isPending}
                  className="w-full bg-red-600 hover:bg-red-700"
                  data-testid="button-checkout"
                >
                  {placeOrderMutation.isPending ? "En cours..." : "Confirmer la commande"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
