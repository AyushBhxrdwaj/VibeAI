'use client'
import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

const MeetingsView = () => {
    const trpc=useTRPC();
    const {data}=useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

  return (
    <div></div>
  )
}

export default MeetingsView

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Something went wrong"
      description="Please try again later or contact support if the issue persists."
    />
  );
};
export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a few seconds...."
    />
  );
};