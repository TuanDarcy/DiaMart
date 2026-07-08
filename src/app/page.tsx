import { HomePage } from "@/features/storefront/home-page";
import { getHomeStorefrontData } from "@/services/storefront/storefront-service";

export default async function Home() {
  const data = await getHomeStorefrontData();

  return <HomePage {...data} />;
}
