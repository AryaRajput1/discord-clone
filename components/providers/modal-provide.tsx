"use client"

import { useEffect, useState } from "react";
import CreateServerModal from "../modals/createServerModal";
import InviteModal from "../modals/inviteModal";
import EditServerModal from "../modals/editServerModal";
import MembersModal from "../modals/membersModal";
import CreateChannelModal from "../modals/createChannelModal";
import LeaveServerModal from "../modals/leaveServerModal";
import DeleteServerModal from "../modals/deleteServerModal";
import DeleteChannelModal from "../modals/deleteChannelModal";
import EditChannelModal from "../modals/editChannelModal";
import MessageFileModal from "../modals/messageFileModal";
import DeleteMessageModal from "../modals/deleteMessageModal";

function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }
    return (
        <>
         <CreateServerModal/>
         <InviteModal/>
         <EditServerModal/>
         <MembersModal/>
         <CreateChannelModal/>
         <LeaveServerModal/>
         <DeleteServerModal/>
         <DeleteChannelModal/>
         <EditChannelModal/>
         <MessageFileModal/>
         <DeleteMessageModal/>
        </>
       
    )
}

export default ModalProvider