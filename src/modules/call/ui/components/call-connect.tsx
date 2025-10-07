'use client'


import { useTRPC } from "@/trpc/client"
import { Call, CallingState, StreamCall, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk"
import { useMutation } from "@tanstack/react-query"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { useEffect, useState } from "react"
import { Loader2Icon } from "lucide-react"
import { CallUI } from "./call-ui"
interface props{
    meetingId:string,
    meetingName:string,
    userName:string,
    userId:string,
    userImage:string
}

const CallConnect = ({ meetingId, meetingName, userName, userId, userImage }: props) => {
    const trpc=useTRPC();
    const {mutateAsync:generateToken}=useMutation(
        trpc.meetings.generateToken.mutationOptions()
    );
    const [client,setclient]=useState<StreamVideoClient>();

    useEffect(()=>{
        const _client=new StreamVideoClient({

          apiKey:process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
          user:{
            id:userId,
            name:userName,
            image:userImage
          },
          tokenProvider:generateToken

        });
        setclient(_client)
        return ()=>{
          _client.disconnectUser();
          setclient(undefined)
        }

    },[userId,userName,userImage,generateToken]);

    const [call,setcall]=useState<Call>();
    useEffect(()=>{
      if(!client) return 

      const _call = client.call("default",meetingId);
      _call.camera.disable();
      _call.microphone.disable();
      setcall(_call); 

      return ()=>{
        if(_call.state.callingState!==CallingState.LEFT){
          _call.leave();
          _call.endCall();
          setcall(undefined);
        }
      }

    },[client,meetingId]);
    if(!client||!call){
       return (
            <div className="flex h-screen items-center justify-center bg-radial from-stone-800 to-stone-900">
              <Loader2Icon className="size-6 animate-spin text-white" />
            </div>
          );
    }
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>

    </StreamVideo>
  )
}

export default CallConnect