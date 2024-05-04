import {ConferencesService} from "@/services/client.service";
import {MetadataRoute} from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const conferences = await ConferencesService.getAll()
    return conferences.flatMap(conf => ([...conf.items.map(item => ({
        url: `${process.env.NEXTAUTH_URL}/uk/conference/${item.id}`,
        lastModified: new Date()
    }))]))
}
