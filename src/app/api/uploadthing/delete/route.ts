import { UTApi } from "uploadthing/server";
import { NextResponse } from "next/server";

const utapi = new UTApi({
  apiKey: process.env.UPLOADTHING_SECRET,
  fetch: fetch,
});

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileKey = searchParams.get("fileKey");


    if (!fileKey) {
      console.error("[UploadThing Delete] FileKey não fornecido");
      return NextResponse.json(
        { error: "FileKey não fornecido" },
        { status: 400 }
      );
    }

    const result = await utapi.deleteFiles(fileKey);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[UploadThing Delete] Erro ao deletar arquivo:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Erro ao deletar arquivo",
      },
      { status: 500 }
    );
  }
}
