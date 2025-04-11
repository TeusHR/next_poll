import React, { Suspense } from "react";
import Loading from "@/components/Loading";
import CYSTabs from "./components/Tabs";

const CYS = () => {
  return (
    <div>
      <Suspense fallback={<Loading transparent />}>
        <CYSTabs />
      </Suspense>
    </div>
  );
};

export default CYS;
