import {ScienceCompetitionService} from "@/services/client.service";
import { MetadataRoute } from "next";

type Props = {
  params: {
    locale: string;
  };
};

export default async function sitemap({ params: { locale } }: Props): Promise<MetadataRoute.Sitemap> {
  const data = await ScienceCompetitionService.getAll(locale.toUpperCase());
  return data.flatMap((conf) => [
    ...conf.items.map((item) => ({
      url: `${process.env.NEXTAUTH_URL}/uk/science-competition/${item.id}`,
      lastModified: new Date(),
    })),
  ]);
}
