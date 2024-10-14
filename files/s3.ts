import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { FileStorage } from "./files";

export class S3Bucket implements FileStorage {
  client: S3Client;
  bucket: string;
  constructor(bucket: string, region: string) {
    // initialize s3 client
    this.client = new S3Client({
      region: region || process.env.AWS_REGION,
    });
    this.bucket = bucket;
  }

  async uploadFile(file: File): Promise<string> {
    let url = "";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: file.name,
          Body: buffer,
        }),
      );
      url = `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.name}`;
    } catch (e) {
      console.error(e);
      console.error("Error uploading file!!!");
      throw new Error("Error uploading file");
    }

    return url;
  }

  async uploadFiles(files: File[]): Promise<string[]> {
    return Promise.all(files.map((file) => this.uploadFile(file)));
  }

  async deleteFile(url: string): Promise<void> {
    // delete file from s3
    console.log("deleting file: ", url);
    return;
  }
}
