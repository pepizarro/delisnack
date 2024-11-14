import { OrderError, OrderErrorType } from "@/utils/errors";
import { Database } from "../db";
import { Lunch, Order } from "../schema";

import app from "@/utils/firebaseConfig";
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  runTransaction,
} from "firebase/firestore";

export class FirestoreDB implements Database {
  db: Firestore;
  lunchesRef: CollectionReference;
  ordersRef: CollectionReference;

  constructor() {
    this.db = getFirestore(app);
    this.lunchesRef = collection(this.db, "lunches");
    this.ordersRef = collection(this.db, "orders");
  }

  async getLunches(): Promise<Lunch[]> {
    //getDocs(lunchesCol).then((snapshot) => {
    //  snapshot.forEach((doc) => {
    //    console.log(doc.id, "=>", doc.data());
    //  });
    //});

    //return mockLunches;

    const lunches: Lunch[] = [];

    try {
      const snapshot = await getDocs(this.lunchesRef);
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        lunches.push({
          id: doc.id,
          name: data.name,
          description: data.description,
          shortDescription: data.shortDescription,
          price: data.price,
          available: data.available,
          stock: data.stock,
          images: data.images,
        });
      });

      return lunches;

      //lunches.push(snapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error(error);
      throw new Error("Error getting lunches");
    }
  }

  async getLunch(id: string): Promise<Lunch> {
    try {
      const docRef = doc(this.db, "lunches", id);
      //console.log(docRef);
      const snapshot = await getDoc(docRef);
      const data = snapshot.data();
      if (!data) {
        throw new Error(`Lunch with id: ${id} not found`);
      }

      this.validateLunch(data, id);

      const lunch = {
        id: id,
        name: data.name,
        description: data.description,
        shortDescription: data.shortDescription,
        price: data.price,
        available: data.available,
        stock: data.stock,
        images: data.images,
      };
      return lunch;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting lunch by id: " + id);
    }
  }

  async addLunch(lunch: Lunch): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = lunch;
    //const rest = { ...lunch };
    //delete rest.id;

    addDoc(this.lunchesRef, rest);

    return;
  }

  async getOrder(orderId: string): Promise<Order[]> {
    console.log(orderId);
    return [];
  }

  async createOrder(order: Order): Promise<string> {
    runTransaction(this.db, async (transaction) => {
      console.log("Transaction started");
      for (const lunch of order.lunches) {
        const lunchRef = doc(this.lunchesRef, lunch.lunchId);
        const lunchDoc = await transaction.get(lunchRef);
        if (!lunchDoc.exists()) {
          throw new OrderError(
            `Lunch with id: ${lunch.lunchId} not found`,
            OrderErrorType.InvalidOrder,
          );
        }

        const lunchData = lunchDoc.data();
        this.validateLunch(lunchData, lunch.lunchId);

        if (lunchData.stock < lunch.amount) {
          throw new OrderError(
            `Not enough stock for lunch with id: ${lunch.lunchId}`,
            OrderErrorType.OutOfStock,
            lunch.lunchId,
          );
        }

        if (lunchData.price !== lunch.pricePerUnit) {
          throw new OrderError(
            `Price mismatch for lunch with id: ${lunch.lunchId}`,
            OrderErrorType.InvalidOrder,
            lunch.lunchId,
          );
        }

        transaction.update(lunchRef, {
          stock: lunchData.stock - lunch.amount,
        });
        console.log("Transaction succesful lunch with id: ", lunch.lunchId);
      }
    });

    order.placedOrderTime = new Date();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = order;

    const orderDoc = await addDoc(this.ordersRef, rest);
    console.log("Order created with id: ", orderDoc.id);

    return orderDoc.id;
  }

  private validateLunch(doc: DocumentData | undefined, id: string) {
    if (!doc) {
      throw new Error("Lunch not found");
    }

    const attributes = [
      "name",
      "description",
      "shortDescription",
      "price",
      "available",
      "stock",
      "images",
    ];
    for (const attr of attributes) {
      if (doc[attr] === undefined) {
        throw new Error(`Lunch with id: ${id} is missing ${attr}`);
      }
    }
  }
}
