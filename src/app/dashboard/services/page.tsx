import { prisma } from "@/lib/prisma";
import { ServiceManager } from "./components/ServiceManager";
import { Decimal } from "@prisma/client/runtime/library";
import { Service } from "./types";

interface ServiceWithDecimal extends Omit<Service, "price"> {
  price: Decimal;
}

function serializeService(service: ServiceWithDecimal): Service {
  return {
    ...service,
    price: Number(service.price),
  };
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Serializa os serviços antes de passar para o componente cliente
  const serializedServices = services.map(serializeService);

  return <ServiceManager initialServices={serializedServices} />;
}
