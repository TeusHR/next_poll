import {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/cms/', '/login/'],
        },
        sitemap: [
            `${process.env.NEXTAUTH_URL}/sitemap.xml`,
            `${process.env.NEXTAUTH_URL}/conference/sitemap.xml`,
            `${process.env.NEXTAUTH_URL}/innovations/sitemap.xml`,
            `${process.env.NEXTAUTH_URL}/international/sitemap.xml`,
            `${process.env.NEXTAUTH_URL}/laboratory/sitemap.xml`
        ],
    }
}
