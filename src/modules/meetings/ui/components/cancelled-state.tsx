import EmptyState from "@/components/empty-state";
import React from "react";

const CancelledState = () => {
  return (
    <div className="bg-slate-200 rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting is Cancelled"
        description="This meeting has been cancelled."
      />
    </div>
  );
};

export default CancelledState;
