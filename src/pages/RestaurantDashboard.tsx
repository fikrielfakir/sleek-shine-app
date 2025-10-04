import { useQuery, useMutation } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Order, OrderItem } from "../../shared/schema";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

interface OrderWithItems extends Order {
  items: OrderItem[];
}

export default function RestaurantDashboard() {
  const { data: orders, isLoading } = useQuery<OrderWithItems[]>({ queryKey: ["/api/orders"] });
  const { toast } = useToast();

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest(`/api/orders/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({
        title: "Statut mis à jour",
        description: "Le statut de la commande a été modifié.",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-600";
      case "confirmed": return "bg-blue-600";
      case "preparing": return "bg-orange-600";
      case "ready": return "bg-green-600";
      case "delivering": return "bg-purple-600";
      case "completed": return "bg-gray-600";
      case "cancelled": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "En attente";
      case "confirmed": return "Confirmée";
      case "preparing": return "En préparation";
      case "ready": return "Prête";
      case "delivering": return "En livraison";
      case "completed": return "Terminée";
      case "cancelled": return "Annulée";
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-white text-2xl">Chargement...</p>
      </div>
    );
  }

  const activeOrders = orders?.filter(
    o => !["completed", "cancelled"].includes(o.status)
  ) || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tableau de bord - Restaurant</h1>
          <Link to="/" data-testid="link-home">
            <Button variant="outline" className="border-zinc-700">
              <Home className="mr-2 h-5 w-5" />
              Accueil
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm text-gray-400">Commandes actives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white" data-testid="text-active-orders">{activeOrders.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm text-gray-400">Total commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white" data-testid="text-total-orders">{orders?.length || 0}</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm text-gray-400">Revenue aujourd'hui</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white" data-testid="text-revenue">
                {orders?.reduce((sum, o) => sum + o.total, 0).toFixed(2)}€
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Commandes en cours</h2>
          {activeOrders.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">Aucune commande active</p>
              </CardContent>
            </Card>
          ) : (
            activeOrders.map((order) => (
              <Card key={order.id} className="bg-zinc-900 border-zinc-800" data-testid={`card-order-${order.id}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white" data-testid={`text-order-id-${order.id}`}>
                        Commande #{order.id}
                      </CardTitle>
                      <p className="text-sm text-gray-400 mt-1">
                        {order.customerName} - {order.customerPhone}
                      </p>
                      {order.orderType === "delivery" && order.deliveryAddress && (
                        <p className="text-sm text-gray-400">📍 {order.deliveryAddress}</p>
                      )}
                      {order.orderType === "pickup" && <p className="text-sm text-gray-400">🚶 À emporter</p>}
                      {order.orderType === "dine-in" && <p className="text-sm text-gray-400">🍽️ Sur place</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600" data-testid={`text-order-total-${order.id}`}>
                        {order.total.toFixed(2)}€
                      </p>
                      <Badge className={getStatusColor(order.status)} data-testid={`badge-status-${order.id}`}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {order.notes && (
                    <div className="mb-4 p-3 bg-zinc-800 rounded">
                      <p className="text-sm text-gray-400">📝 Note: {order.notes}</p>
                    </div>
                  )}
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-semibold text-gray-400">Articles commandés:</p>
                    <div className="text-sm text-white">
                      {order.items?.length > 0 ? (
                        order.items.map((item) => (
                          <div key={item.id} className="flex justify-between py-1">
                            <span>Article #{item.menuItemId} x{item.quantity}</span>
                            <span>{(item.price * item.quantity).toFixed(2)}€</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">Détails non disponibles</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={order.status}
                      onValueChange={(status) => updateStatusMutation.mutate({ id: order.id, status })}
                    >
                      <SelectTrigger className="flex-1 bg-zinc-800 border-zinc-700" data-testid={`select-status-${order.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="confirmed">Confirmée</SelectItem>
                        <SelectItem value="preparing">En préparation</SelectItem>
                        <SelectItem value="ready">Prête</SelectItem>
                        <SelectItem value="delivering">En livraison</SelectItem>
                        <SelectItem value="completed">Terminée</SelectItem>
                        <SelectItem value="cancelled">Annulée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
