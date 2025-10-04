import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";
import type { Order, OrderItem } from "../../shared/schema";

interface OrderWithItems extends Order {
  items?: OrderItem[];
}

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  completedOrders: number;
  avgOrderValue: number;
  ordersByStatus: Record<string, number>;
}

export default function AdminDashboard() {
  const { data: analytics } = useQuery<AnalyticsData>({ queryKey: ["/api/analytics/sales"] });
  const { data: orders } = useQuery<OrderWithItems[]>({ queryKey: ["/api/orders"] });

  const recentOrders = orders?.slice(0, 10) || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tableau de bord - Admin</h1>
          <Link to="/" data-testid="link-home">
            <Button variant="outline" className="border-zinc-700">
              <Home className="mr-2 h-5 w-5" />
              Accueil
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Revenu Total</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white" data-testid="text-total-revenue">
                {analytics?.totalRevenue.toFixed(2)}€
              </div>
              <p className="text-xs text-gray-500 mt-1">Tous les temps</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Commandes</CardTitle>
              <ShoppingBag className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white" data-testid="text-total-orders">
                {analytics?.totalOrders || 0}
              </div>
              <p className="text-xs text-gray-500 mt-1">Toutes les commandes</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Commandes Terminées</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white" data-testid="text-completed-orders">
                {analytics?.completedOrders || 0}
              </div>
              <p className="text-xs text-gray-500 mt-1">Commandes complétées</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Panier Moyen</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white" data-testid="text-avg-order">
                {analytics?.avgOrderValue.toFixed(2)}€
              </div>
              <p className="text-xs text-gray-500 mt-1">Par commande</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Commandes par Statut</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics?.ordersByStatus && Object.entries(analytics.ordersByStatus).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className="text-gray-400 capitalize">{status}</span>
                    <span className="font-bold text-white" data-testid={`text-status-${status}`}>{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/restaurant" data-testid="link-restaurant">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Voir Tableau de bord Restaurant
                </Button>
              </Link>
              <Link to="/order" data-testid="link-order">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Voir Menu Client
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Commandes Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <p className="text-gray-400 text-center py-4">Aucune commande</p>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center p-4 bg-zinc-800 rounded-lg"
                    data-testid={`order-${order.id}`}
                  >
                    <div>
                      <p className="font-medium text-white">Commande #{order.id}</p>
                      <p className="text-sm text-gray-400">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">{order.total.toFixed(2)}€</p>
                      <p className="text-xs text-gray-400 capitalize">{order.status}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
