import { getServices } from "@/lib/fetchers";
import { ServiceManager } from "./components/ServiceManager";

export const revalidate = 0;

export default async function ServicesPage() {
  const services = await getServices();
  return <ServiceManager initialServices={services} />;
}
