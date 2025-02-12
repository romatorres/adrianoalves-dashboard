import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Upload de imagens
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => ({ uploadedBy: "user" }))
    .onUploadComplete((data) => ({ url: data.file.url })),

  // Upload de documentos
  documentUploader: f({
    pdf: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(() => ({ uploadedBy: "user" }))
    .onUploadComplete((data) => ({ url: data.file.url })),

  // Upload de vídeos
  videoUploader: f({
    video: { maxFileSize: "32MB", maxFileCount: 1 },
  })
    .middleware(() => ({ uploadedBy: "user" }))
    .onUploadComplete((data) => ({ url: data.file.url })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
