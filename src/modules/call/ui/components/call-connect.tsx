'use client'


import { useTRPC } from "@/trpc/client"
import { StreamVideoClient } from "@stream-io/node-sdk"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
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
            
        })

    },[])
  return (
    <div>call-connect</div>
  )
}

export default CallConnect