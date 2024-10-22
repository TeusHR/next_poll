"use client";
import React, { FC } from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import StudentFormCreate from "../StudentForm";
import { StudentLang } from "../StudentTabs";

type Props = {
  student: StudentLang;
};

const StudentCreate: FC<Props> = ({ student }) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<StudentFormCreate student={student.UA} language={Language.UA} />}
        tabEnglish={<StudentFormCreate student={student.EN} language={Language.EN} />}
      />
    </div>
  );
};

export default StudentCreate;
