import React, { Suspense } from "react";
import Loading from "@/components/Loading";
import AgreementsTabs from "./components/AgreementsTabs";

const Agreements = () => {
  return (
    <div>
      <Suspense fallback={<Loading transparent />}>
        <AgreementsTabs />
      </Suspense>
    </div>
  );
};

export default Agreements;
