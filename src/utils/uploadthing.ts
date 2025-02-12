import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();

// Removendo a geração de componentes que não estamos usando
// export const { UploadButton, UploadDropzone } = generateComponents<OurFileRouter>();
