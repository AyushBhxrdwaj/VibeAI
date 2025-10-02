"use client";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import MeetingIdViewHeader from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import useConfirm from "@/modules/agents/hooks/use-confirm";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import UpdateMeetingDialog from "../components/update-meeting-dialog";
import UpcomingState from "../components/upcoming-state";
import ActiveState from "../components/active-state";
import CancelledState from "../components/cancelled-state";
import ProcessingState from "../components/processing-state";

interface props {
  meetingId: string;
}
const MeetingIdView = ({ meetingId }: props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you Sure?",
    "The following action will remove this meeting."
  );
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  const router = useRouter();
  const [updateMeetingDialogOpen,setupdateMeetingDialogOpen]=useState(false);

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
    })
  );
  const handleRemoveConfirm=async ()=>{
    const ok=await confirmRemove();
    if(!ok)return 
    await removeMeeting.mutateAsync({id:meetingId})
  }

  const isActive=data.status==='active'
  const isUpcoming=data.status==='upcoming'
  const isCancelled=data.status==='cancelled'
  const isCompleted=data.status==='completed'
  const isProcessing=data.status==='processing'
  return (
    <>
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <RemoveConfirmation/>
        <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setupdateMeetingDialogOpen}
        initialValues={data}
        />
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setupdateMeetingDialogOpen(true)}
          onRemove={handleRemoveConfirm}
        />

        {isCancelled&&(<CancelledState/>)}
        {isProcessing&&(<ProcessingState/>)} 
        {isCompleted&&<div>Completed</div>}
        {isActive&&(<ActiveState meetingId={meetingId}/>)}
        {isUpcoming&&(<UpcomingState meetingId={meetingId} onCancelMeeting={()=>{}} isCancelling={false}/>)}
      </div>
    </> 
  );
};
export const MeetingIdViewError = () => {
  return (
      <ErrorState
        title="Something went wrong"
        description="Please try again later or contact support if the issue persists."
      />
  );
};
export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take a few seconds...."/>
  );
};



export default MeetingIdView;
