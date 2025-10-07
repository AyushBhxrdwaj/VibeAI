import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallLobby } from "./call-lobby";

interface props{
    meetingName:string;
}

export const CallUI = ({meetingName}:props) => {
    const call = useCall();
    const [show,setshow]=useState<"lobby"|"call"|"ended">('lobby');
    const handleJoin = async ()=>{
        if(!call) return;
        await call.join();
        setshow('call')

    };

    const handleLeave=()=>{
        if(!call)return;
        call.endCall();
        setshow('ended')
    };

    return(
        
     <StreamTheme className="h-full">
        {show==='lobby'&&<CallLobby onJoin={handleJoin}/>}
        {show==='call'&&<p>In Call</p>}
        {show==='ended'&&<p>Call Ended</p>}
     </StreamTheme>
     )

}

