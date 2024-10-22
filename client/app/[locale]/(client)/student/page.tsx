import React, { FC } from "react";
import Title from "@/UI/Title";
import { StudentService } from "@/services/client.service";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { stripHtml } from "@/utils/StripHtml";

type Props = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  try {
    const student = await StudentService.getAll(locale.toUpperCase());
    if (!student) throw new Error("Could not find student");

    return {
      title: "Студентська наука",
      description: stripHtml(student.text, 197),
      openGraph: {
        url: "/student/",
      },
    };
  } catch (e) {
    return {
      title: "Сторінка не знайдена",
      openGraph: {
        title: "Сторінка не знайдена",
        url: `/student/`,
      },
    };
  }
}

const Student: FC<Props> = async ({ params: { locale } }) => {
  const student = await StudentService.getAll(locale.toUpperCase());

  if (student === null) return notFound();

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title text="Студентська наука" style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold" />
        <div className="text-xl max-sm:text-base" dangerouslySetInnerHTML={{ __html: student.text }}></div>
      </div>
    </div>
  );
};

export default Student;
