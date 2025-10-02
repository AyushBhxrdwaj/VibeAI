import EmptyState from "@/components/empty-state";
import React from "react";

const ProcessingState = () => {
  return (
    <div className="bg-slate-200 rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/processing.svg"
        title="Meeting is Completed"
        description="This meeting was completed, a summary will appear soon."
      />
    </div>
  );
};

export default ProcessingState;
