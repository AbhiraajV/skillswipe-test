import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("Upload complete for");

      console.log("file url", file.url);

      return { uploaded: file.url };
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
