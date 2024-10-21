import {MetadataRoute} from "next";
import {InternationalService} from "@/services/client.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const international = await InternationalService.getAll(1, 150)
    return international.data.map(item => ({
        url: `${process.env.NEXTAUTH_URL}/uk/international/${item.id}`,
        lastModified: new Date()
    }))
}
