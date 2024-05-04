import {MetadataRoute} from "next";
import {InnovationService} from "@/services/client.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const innovations = await InnovationService.getAll( 1, 150)
    return innovations.data.map(item => ({
        url: `${process.env.NEXTAUTH_URL}/uk/innovations/${item.id}`,
        lastModified: new Date()
    }))
}
