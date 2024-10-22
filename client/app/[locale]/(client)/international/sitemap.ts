import { MetadataRoute } from "next";
import { InternationalService } from "@/services/client.service";

type Props = {
  params: {
    locale: string;
  };
};

export default async function sitemap({ params: { locale } }: Props): Promise<MetadataRoute.Sitemap> {
  const international = await InternationalService.getAll(1, 150, undefined, undefined, locale.toUpperCase());
  return international.data.map((item) => ({
    url: `${process.env.NEXTAUTH_URL}/uk/international/${item.id}`,
    lastModified: new Date(),
  }));
}
