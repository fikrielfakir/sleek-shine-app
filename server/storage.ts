import type {
  User, InsertUser,
  Restaurant, InsertRestaurant,
  MenuItem, InsertMenuItem,
  Order, InsertOrder,
  OrderItem, InsertOrderItem
} from "../shared/schema";

export interface IStorage {
  users: {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User | null>;
    getByEmail(email: string): Promise<User | null>;
    create(user: InsertUser): Promise<User>;
    update(id: number, user: Partial<InsertUser>): Promise<User | null>;
    delete(id: number): Promise<boolean>;
  };
  restaurants: {
    getAll(): Promise<Restaurant[]>;
    getById(id: number): Promise<Restaurant | null>;
    create(restaurant: InsertRestaurant): Promise<Restaurant>;
    update(id: number, restaurant: Partial<InsertRestaurant>): Promise<Restaurant | null>;
    delete(id: number): Promise<boolean>;
  };
  menuItems: {
    getAll(): Promise<MenuItem[]>;
    getByCategory(category: string): Promise<MenuItem[]>;
    getById(id: number): Promise<MenuItem | null>;
    create(item: InsertMenuItem): Promise<MenuItem>;
    update(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem | null>;
    delete(id: number): Promise<boolean>;
  };
  orders: {
    getAll(): Promise<Order[]>;
    getById(id: number): Promise<Order | null>;
    getByUserId(userId: number): Promise<Order[]>;
    getByRestaurantId(restaurantId: number): Promise<Order[]>;
    create(order: InsertOrder): Promise<Order>;
    updateStatus(id: number, status: string): Promise<Order | null>;
    update(id: number, order: Partial<InsertOrder>): Promise<Order | null>;
  };
  orderItems: {
    getByOrderId(orderId: number): Promise<OrderItem[]>;
    create(item: InsertOrderItem): Promise<OrderItem>;
    deleteByOrderId(orderId: number): Promise<boolean>;
  };
}

export class MemStorage implements IStorage {
  private _users: User[] = [];
  private _restaurants: Restaurant[] = [];
  private _menuItems: MenuItem[] = [];
  private _orders: Order[] = [];
  private _orderItems: OrderItem[] = [];
  
  private userIdCounter = 1;
  private restaurantIdCounter = 1;
  private menuItemIdCounter = 1;
  private orderIdCounter = 1;
  private orderItemIdCounter = 1;

  users = {
    getAll: async () => this._users,
    getById: async (id: number) => this._users.find(u => u.id === id) || null,
    getByEmail: async (email: string) => this._users.find(u => u.email === email) || null,
    create: async (user: InsertUser) => {
      const newUser: User = { ...user, id: this.userIdCounter++ };
      this._users.push(newUser);
      return newUser;
    },
    update: async (id: number, user: Partial<InsertUser>) => {
      const index = this._users.findIndex(u => u.id === id);
      if (index === -1) return null;
      this._users[index] = { ...this._users[index], ...user };
      return this._users[index];
    },
    delete: async (id: number) => {
      const index = this._users.findIndex(u => u.id === id);
      if (index === -1) return false;
      this._users.splice(index, 1);
      return true;
    },
  };

  restaurants = {
    getAll: async () => this._restaurants,
    getById: async (id: number) => this._restaurants.find(r => r.id === id) || null,
    create: async (restaurant: InsertRestaurant) => {
      const newRestaurant: Restaurant = { ...restaurant, id: this.restaurantIdCounter++ };
      this._restaurants.push(newRestaurant);
      return newRestaurant;
    },
    update: async (id: number, restaurant: Partial<InsertRestaurant>) => {
      const index = this._restaurants.findIndex(r => r.id === id);
      if (index === -1) return null;
      this._restaurants[index] = { ...this._restaurants[index], ...restaurant };
      return this._restaurants[index];
    },
    delete: async (id: number) => {
      const index = this._restaurants.findIndex(r => r.id === id);
      if (index === -1) return false;
      this._restaurants.splice(index, 1);
      return true;
    },
  };

  menuItems = {
    getAll: async () => this._menuItems,
    getByCategory: async (category: string) => 
      this._menuItems.filter(item => item.category === category),
    getById: async (id: number) => this._menuItems.find(item => item.id === id) || null,
    create: async (item: InsertMenuItem) => {
      const newItem: MenuItem = { ...item, id: this.menuItemIdCounter++ };
      this._menuItems.push(newItem);
      return newItem;
    },
    update: async (id: number, item: Partial<InsertMenuItem>) => {
      const index = this._menuItems.findIndex(i => i.id === id);
      if (index === -1) return null;
      this._menuItems[index] = { ...this._menuItems[index], ...item };
      return this._menuItems[index];
    },
    delete: async (id: number) => {
      const index = this._menuItems.findIndex(i => i.id === id);
      if (index === -1) return false;
      this._menuItems.splice(index, 1);
      return true;
    },
  };

  orders = {
    getAll: async () => this._orders,
    getById: async (id: number) => this._orders.find(o => o.id === id) || null,
    getByUserId: async (userId: number) => this._orders.filter(o => o.userId === userId),
    getByRestaurantId: async (restaurantId: number) => 
      this._orders.filter(o => o.restaurantId === restaurantId),
    create: async (order: InsertOrder) => {
      const newOrder: Order = { 
        ...order, 
        id: this.orderIdCounter++,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this._orders.push(newOrder);
      return newOrder;
    },
    updateStatus: async (id: number, status: string) => {
      const index = this._orders.findIndex(o => o.id === id);
      if (index === -1) return null;
      this._orders[index] = { 
        ...this._orders[index], 
        status: status as any,
        updatedAt: new Date()
      };
      return this._orders[index];
    },
    update: async (id: number, order: Partial<InsertOrder>) => {
      const index = this._orders.findIndex(o => o.id === id);
      if (index === -1) return null;
      this._orders[index] = { 
        ...this._orders[index], 
        ...order,
        updatedAt: new Date()
      };
      return this._orders[index];
    },
  };

  orderItems = {
    getByOrderId: async (orderId: number) => 
      this._orderItems.filter(item => item.orderId === orderId),
    create: async (item: InsertOrderItem) => {
      const newItem: OrderItem = { ...item, id: this.orderItemIdCounter++ };
      this._orderItems.push(newItem);
      return newItem;
    },
    deleteByOrderId: async (orderId: number) => {
      const initialLength = this._orderItems.length;
      this._orderItems = this._orderItems.filter(item => item.orderId !== orderId);
      return this._orderItems.length < initialLength;
    },
  };
}

export const storage = new MemStorage();
