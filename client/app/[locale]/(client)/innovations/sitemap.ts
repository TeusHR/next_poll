import { MetadataRoute } from "next";
import { InnovationService } from "@/services/client.service";

type Props = {
  params: {
    locale: string;
  };
};

export default async function sitemap({ params: { locale } }: Props): Promise<MetadataRoute.Sitemap> {
  const innovations = await InnovationService.getAll(1, 150, undefined, undefined, locale.toUpperCase());
  return innovations.data.map((item) => ({
    url: `${process.env.NEXTAUTH_URL}/uk/innovations/${item.id}`,
    lastModified: new Date(),
  }));
}
