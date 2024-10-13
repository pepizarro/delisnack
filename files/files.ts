import { S3Bucket } from "./s3";

export interface FileStorage {
  uploadFile(file: File): Promise<string>;
  deleteFile(url: string): Promise<void>;
  uploadFiles(files: File[]): Promise<string[]>;
}

const fileStorage = new S3Bucket(
  "delisnack-assets",
  "sa-east-1",
) as FileStorage;

export default fileStorage;

//export interface AppFile {
//  url: string;
//  extension: "png" | "jpg" | "jpeg" | "gif" | "svg" | "webp";
//  size?: number;
//}
