import {MetadataRoute} from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${process.env.NEXTAUTH_URL}`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXTAUTH_URL}/activity`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXTAUTH_URL}/conference`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXTAUTH_URL}/consulting`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXTAUTH_URL}/cooperation`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXTAUTH_URL}/department`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXTAUTH_URL}/innovations`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXTAUTH_URL}/international`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXTAUTH_URL}/laboratory`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXTAUTH_URL}/research`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXTAUTH_URL}/science`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXTAUTH_URL}/student`,
            lastModified: new Date(),
        },
    ]
}
