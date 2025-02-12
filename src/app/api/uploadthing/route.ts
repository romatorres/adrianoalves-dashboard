import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Verificação de variáveis de ambiente
if (!process.env.UPLOADTHING_APP_ID || !process.env.UPLOADTHING_SECRET) {
  throw new Error(
    "UPLOADTHING_APP_ID e UPLOADTHING_SECRET devem estar definidos"
  );
}

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
