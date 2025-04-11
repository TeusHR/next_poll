import {EventsService} from "@/services/client.service";
import { MetadataRoute } from "next";

type Props = {
  params: {
    locale: string;
  };
};

export default async function sitemap({ params: { locale } }: Props): Promise<MetadataRoute.Sitemap> {
  const data = await EventsService.getAll("date", "asc", locale.toUpperCase());
  return data.map((item) => ({
    url: `${process.env.NEXTAUTH_URL}/uk/events/${item.id}`,
    lastModified: new Date(),
  }));
}
