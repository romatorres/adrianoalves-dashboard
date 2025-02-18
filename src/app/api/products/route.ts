import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Decimal } from "@prisma/client/runtime/library";
import { revalidateTag } from "next/cache";

function serializeProduct(product: {
  price: Decimal;
  [key: string]: Decimal | string | boolean | Date | number | null;
}) {
  return {
    ...product,
    price: Number(product.price),
  };
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        active: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = NextResponse.json({
      success: true,
      data: products.map((product) => ({
        ...product,
        price: Number(product.price),
      })),
    });

    response.headers.set("Cache-Control", "no-store, max-age=0");
    response.headers.set("x-vercel-revalidate", "1");
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error fetching products",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const product = await prisma.product.create({
      data: {
        ...data,
        price: new Decimal(data.price),
      },
    });
    const response = NextResponse.json({
      success: true,
      data: serializeProduct(product),
    });

    response.headers.set("Cache-Control", "no-store, max-age=0");
    response.headers.set("x-vercel-revalidate", "1");
    revalidateTag("products");
    revalidateTag("dashboard-products");
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Error creating product" },
      { status: 500 }
    );
  }
}
