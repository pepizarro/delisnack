import { FirestoreDB } from "./firestore/firestore";
import { Lunch, Reservation } from "./schema";

export interface Database {
  getLunches(): Promise<Lunch[]>;
  getLunch(id: string): Promise<Lunch>;
  getReservations(lunchId: string): Promise<Reservation[]>;
  addLunch(lunch: Lunch): Promise<void>;
}

const db = new FirestoreDB() as Database;
export default db;
