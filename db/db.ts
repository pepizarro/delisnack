import { FirestoreDB } from "./firestore/firestore";
import { Lunch, Order } from "./schema";

export interface Database {
  getLunches(): Promise<Lunch[]>;
  getLunch(id: string): Promise<Lunch>;
  addLunch(lunch: Lunch): Promise<void>;
  updateLunch(newLunch: Lunch): Promise<void>;

  getOrder(orderId: string): Promise<Order[]>;
  createOrder(order: Order): Promise<string>;
  updateOrder<K extends keyof Order>(
    orderId: string,
    key: K,
    val: Order[K],
  ): Promise<void>;

  getOrders(): Promise<Order[]>;
}

const db = new FirestoreDB() as Database;
export default db;
