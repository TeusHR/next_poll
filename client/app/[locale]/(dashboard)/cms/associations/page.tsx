import React, { Suspense } from "react";
import Loading from "@/components/Loading";
import AssociationsTabs from "./components/AssociationsTabs";

const Associations = () => {
  return (
    <div>
      <Suspense fallback={<Loading transparent />}>
        <AssociationsTabs />
      </Suspense>
    </div>
  );
};

export default Associations;
