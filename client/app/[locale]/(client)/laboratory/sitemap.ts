import { MetadataRoute } from "next";
import { LaboratoryService } from "@/services/client.service";

type Props = {
  params: {
    locale: string;
  };
};

export default async function sitemap({ params: { locale } }: Props): Promise<MetadataRoute.Sitemap> {
  const laboratories = await LaboratoryService.getAllLaboratories(1, 150, undefined, undefined, locale.toUpperCase());
  return laboratories.data.map((item) => ({
    url: `${process.env.NEXTAUTH_URL}/uk/international/${item.id}`,
    lastModified: new Date(),
  }));
}
