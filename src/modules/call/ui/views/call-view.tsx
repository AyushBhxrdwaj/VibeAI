'use client'
import ErrorState from "@/components/error-state"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import CallProvider from "../components/call-provider"

interface props{
    meetingId:string
}

export const CallView=({meetingId}:props)=>{
    const trpc=useTRPC()
    const {data}=useSuspenseQuery(trpc.meetings.getOne.queryOptions({id:meetingId}))
    if(data.status==='completed'){
        return(
            <div className="h-screen flex items-center justify-center">
                <ErrorState
                title="Meeting has ended"
                description="The meeting you are trying to access has already ended."
                />
            </div>
        )
    }

    return(
        <CallProvider meetingId={meetingId} meetingName={data.name}/>
    )
}