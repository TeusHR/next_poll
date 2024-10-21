import {MetadataRoute} from "next";
import {LaboratoryService} from "@/services/client.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const laboratories = await LaboratoryService.getAllLaboratories(1, 150)
    return laboratories.data.map(item => ({
        url: `${process.env.NEXTAUTH_URL}/uk/international/${item.id}`,
        lastModified: new Date()
    }))
}
