import { ConferencesService } from "@/services/client.service";
import { MetadataRoute } from "next";

type Props = {
  params: {
    locale: string;
  };
};

export default async function sitemap({ params: { locale } }: Props): Promise<MetadataRoute.Sitemap> {
  const conferences = await ConferencesService.getAll(locale.toUpperCase());
  return conferences.flatMap((conf) => [
    ...conf.items.map((item) => ({
      url: `${process.env.NEXTAUTH_URL}/uk/conference/${item.id}`,
      lastModified: new Date(),
    })),
  ]);
}
