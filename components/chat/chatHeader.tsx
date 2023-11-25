import { Hash, Menu } from "lucide-react";
import MobileToggle from "../mobileToggle";
import { Avatar } from "../ui/avatar";
import UserAvatar from "../userAvatar";
import SocketIndicator from "../socketIndicator";
import { ChatVideoButton } from "./chatVideoButton";

interface ChatHeaderProps {
    serverId:string;
    name:string;
    type: 'channel' | 'conversation';
    imageUrl?:string;
}

function ChatHeader({
    serverId,
    name,
    type,
    imageUrl
}:ChatHeaderProps) {
  return (
    <div className="text-md font-semibold px-3 flex items-center  h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
        <MobileToggle serverId={serverId}/>
        {
            type==='channel' && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mx-2"/>
            )
        }
        {
            type==='conversation' && (
                <UserAvatar 
                src={imageUrl}
                className="w-8 h-8
                text-zinc-500 dark:text-zinc-400 mx-2"/>
            )
        }
        <p className="font-semibold text-md text-black dark:text-white capitalize">
            {name}
        </p>
        <div className="ml-auto flex items-center">
            {type==='conversation' &&(
                <ChatVideoButton/>
            )}
            <SocketIndicator/>
        </div>

    </div>
  )
}

export default ChatHeader