"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { StudentService } from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack";
import StudentCreate from "../StudentCreate";
import { IStudent } from "@/types/Student";
import { Language } from "@/types/Language";

export type StudentLang = {
  [key in Language]?: IStudent;
};

const StudentTabs = () => {
  const [initialStudent, setInitialStudent] = useState<StudentLang>({});

  const { status } = useSession();
  const $apiAuth = useAxiosAuth();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchStudents = async () => {
        const students: StudentLang = {};
        const languages = Object.values(Language);

        for (const lang of languages) {
          students[lang] = await StudentService.getStudent($apiAuth, lang.toUpperCase());
        }
        setInitialStudent(students);
      };

      fetchStudents();
    }
  }, [$apiAuth, status]);

  return (
    <div className="flex flex-col px-10 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
      <div className="flex items-center justify-between">
        <TitleBack title="Студентська наука" isBack={false} />
      </div>
      <StudentCreate student={initialStudent} />
    </div>
  );
};

export default StudentTabs;
