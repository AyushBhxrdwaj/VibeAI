import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { DefaultVideoPlaceholder, StreamVideoParticipant, useCallStateHooks } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css"

interface props{
    onJoin:()=>void;
}

export const CallLobby = ({onJoin}:props) => {

    const DisableVideoPreview= ()=>{
        const {data}=authClient.useSession();

        return(
            <DefaultVideoPlaceholder
            participant={
                {
                    name:data?.user.name??"",
                    image:data?.user.image??
                    generateAvatarUri({
                        seed:data?.user.name??"",
                        variant:"initials"
                    }),
                } as StreamVideoParticipant
            }/>
        )

    }


    const {useCameraState,useMicrophoneState}=useCallStateHooks();
    const {hasBrowserPermission:hasMicPermission}=useMicrophoneState();
    const {hasBrowserPermission:hasCamPermission}=useCameraState();

    const hasBrowserMediaPermission=hasMicPermission&&hasCamPermission;

    return(
        <div className="flex flex-col items-center justify-center h-full bg-radial from-gray-800 to-gray-900">
            <div className="py-4 px-8 flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                    <div className="flex flex-col gap-y-2 text-center">
                        <h6 className="text-lg font-medium">Ready to Join</h6>
                        <p className="text-sm">Set up your call before joining</p>
                    </div>
                </div>
            </div>
        </div>
    )

}