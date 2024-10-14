import { Database } from "../db";
import { Lunch, Reservation } from "../schema";

import app from "@/utils/firebaseConfig";
import {
  addDoc,
  collection,
  CollectionReference,
  Firestore,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export class FirestoreDB implements Database {
  db: Firestore;
  lunchesCol: CollectionReference;

  constructor() {
    this.db = getFirestore(app);
    this.lunchesCol = collection(this.db, "lunches");
  }

  async getLunches(): Promise<Lunch[]> {
    //getDocs(lunchesCol).then((snapshot) => {
    //  snapshot.forEach((doc) => {
    //    console.log(doc.id, "=>", doc.data());
    //  });
    //});
    const lunches: Lunch[] = [];

    //return mockLunches;

    try {
      const snapshot = await getDocs(this.lunchesCol);
      console.log("snapshots: ", snapshot);
      snapshot.docs.forEach((doc) => {
        console.log("lunch:", doc.id, "=>", doc.data());
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

      console.log("lunches: ", lunches);
      return lunches;

      //lunches.push(snapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error(error);
      throw new Error("Error getting lunches");
    }
  }

  async getLunch(id: string): Promise<Lunch> {
    console.log(id);
    return {
      id: "id",
      name: "name",
      description: "description",
      shortDescription: "shortDescription",
      price: 1,
      available: true,
      stock: 1,
      images: ["url"],
    };
  }

  async getReservations(lunchId: string): Promise<Reservation[]> {
    console.log(lunchId);
    return [];
  }

  async addLunch(lunch: Lunch): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = lunch;
    //const rest = { ...lunch };
    //delete rest.id;

    addDoc(this.lunchesCol, rest);

    return;
  }
}
