import React from 'react'
import Title from "@/UI/Title";
import {StudentService} from "@/services/client.service";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import {stripHtml} from "@/utils/StripHtml";

export async function generateMetadata(): Promise<Metadata> {
    try {
        const student = await StudentService.getAll()
        if (!student)
            throw new Error("Could not find student");

        return {
            title: "Студентська наука",
            description: stripHtml(student.text, 197),
            openGraph: {
                url: '/student/',
            },
        }
    } catch (e) {
        return {
            title: "Сторінка не знайдена",
            openGraph: {
                title: 'Сторінка не знайдена',
                url: `/student/`,
            },
        }
    }
}

const Student = async ({}) => {
    const student = await StudentService.getAll()

    if (student === null)
        return notFound();

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <Title text="Студентська наука"
                       style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
                <div className="text-xl max-sm:text-base" dangerouslySetInnerHTML={{ __html: student.text }}></div>
            </div>
        </div>
    )
}

export default Student;
