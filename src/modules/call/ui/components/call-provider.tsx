"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";
import React from "react";
import CallConnect from "./call-connect";
import { generateAvatarUri } from "@/lib/avatar";

interface props {
  meetingId: string;
  meetingName: string;
}

const CallProvider = ({ meetingId, meetingName }: props) => {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-stone-800 to-stone-900">
        <Loader2Icon className="size-6 animate-spin text-white" />
      </div>
    );
  }
  return (
    <CallConnect meetingId={meetingId} meetingName={meetingName} userName={data.user.name} userId={data.user.id} userImage={
        data.user.image??generateAvatarUri({seed:data.user.name,variant:'initials'})
    }
    />
  );
};

export default CallProvider;
