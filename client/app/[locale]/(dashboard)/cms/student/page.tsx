import React, { Suspense } from "react";
import Loading from "@/components/Loading";
import StudentTabs from "./components/StudentTabs";

const Student = () => {
  return (
    <div>
      <Suspense fallback={<Loading transparent />}>
        <StudentTabs />
      </Suspense>
    </div>
  );
};

export default Student;
