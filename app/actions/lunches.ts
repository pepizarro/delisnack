"use server";

import { ActionResponse } from "@/app/actions/action";
import db from "@/db/db";
import { Lunch } from "@/db/schema";
import fileStorage from "@/files/files";
import { revalidatePath } from "next/cache";

export async function createLunch(
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  // TODO: validate formData
  const rawFormData = {
    name: formData.get("name") as string,
    description: formData.get("description"),
    shortDescription: formData.get("shortDescription"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    images: formData.getAll("images"),
  };

  let urls: string[];
  const lunchName = rawFormData.name.replace(/\s+/g, "").toLowerCase();

  try {
    let i = 0;
    urls = [];
    for (const image of rawFormData.images) {
      const fileImage = image as File;
      const fileName = `${lunchName}-${i}-${fileImage.name.replace(/\s+/g, "").toLowerCase()}`;
      const file = new File([image], fileName);
      const imageUrl = await fileStorage.uploadFile(file);
      urls.push(imageUrl);
      i++;
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Error uploading images",
      error: true,
    };
  }

  const newLunch: Lunch = {
    id: "",
    name: rawFormData.name as string,
    description: rawFormData.description as string,
    shortDescription: rawFormData.shortDescription as string,
    price: Number(rawFormData.price),
    stock: Number(rawFormData.stock),
    available: Number(rawFormData.stock) > 0,
    images: urls || [],
  };

  try {
    db.addLunch(newLunch);
  } catch (error) {
    console.error(error);
    return {
      message: "Error creating lunch",
      error: true,
    };
  }

  revalidatePath("/");

  // sleep
  return {
    message: "Lunch created",
    error: false,
  };
}

export async function updateLunch(
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  // TODO: validate formData
  const rawFormData = {
    id: formData.get("lunchId") as string,
    name: formData.get("name") as string,
    description: formData.get("description"),
    shortDescription: formData.get("shortDescription"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    images: formData.getAll("images"),
    existingImages: formData.get("existing-images") as string,
  };

  let urls: string[];
  const lunchName = rawFormData.name.replace(/\s+/g, "").toLowerCase();

  try {
    let i = 0;
    urls = [];
    for (const image of rawFormData.images) {
      const fileImage = image as File;
      if (fileImage.size === 0) {
        continue;
      }
      const fileName = `${lunchName}-${i}-${fileImage.name.replace(/\s+/g, "").toLowerCase()}`;
      const file = new File([image], fileName);
      const imageUrl = await fileStorage.uploadFile(file);
      urls.push(imageUrl);
      i++;
    }
    const existing = rawFormData.existingImages
      .split(",")
      .map((image) => image.trim());
    existing.forEach((url) => urls.push(url));
  } catch (error) {
    console.error(error);
    return {
      message: "Error uploading images",
      error: true,
    };
  }

  const newLunch: Lunch = {
    id: rawFormData.id,
    name: rawFormData.name as string,
    description: rawFormData.description as string,
    shortDescription: rawFormData.shortDescription as string,
    price: Number(rawFormData.price),
    stock: Number(rawFormData.stock),
    available: Number(rawFormData.stock) > 0,
    images: urls || [],
  };

  try {
    db.updateLunch(newLunch);
  } catch (error) {
    console.error(error);
    return {
      message: "Error creating lunch",
      error: true,
    };
  }

  revalidatePath("/");

  // sleep
  return {
    message: "Almuerzo actualizado",
    error: false,
  };
}
