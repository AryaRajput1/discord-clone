"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import {
    Check,
    Gavel,
    Loader,
    MoreVertical,
    Shield,
    ShieldAlert,
    ShieldCheck,
    ShieldQuestion,
} from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { ServerWithMembersWithProfiles } from "@/type";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../userAvatar";
import {
    DropdownMenuSub,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuSubContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuPortal,
} from "../dropdown-menu";
import { MemberRole } from "@prisma/client";
import qs from "query-string";

function MembersModal() {
    const router = useRouter();
    const { isOpen, type, onClose, data, onOpen } = useModal();
    const { server } = data as { server: ServerWithMembersWithProfiles };
    const isModalOpen = isOpen && type === "members";

    const [loadingId, setLoadingId] = useState("");
    const roleIconMap = {
        GUEST: null,
        ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
        MODERATOR: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
    };

    const onKick = async (memberId:string)=>{
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                },
            });
            const response = await axios.delete(url);
            router.refresh();
            onOpen("members", { server: response.data })
        } catch (error) {
            console.log('ab',error);
        } finally {
            setLoadingId("");
        }
    }

    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                },
            });
            const response = await axios.patch(url, { role });
            router.refresh();
            onOpen("members", { server: response.data })
        } catch (error) {
            console.log('ab',error);
        } finally {
            setLoadingId("");
        }
    };

    return (
        <div>
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center">
                            Manage Members{" "}
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                            {server?.members?.length} Members
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="mt-8 max-h-[420px] pr-6 ml-6">
                        {server?.members.map((member) => (
                            <div key={member.id} className="flex items-center gap-x-2 mb-6">
                                <UserAvatar src={member.profile.imageUrl} />
                                <div className="flex flex-col gap-y-1">
                                    <div className="text-sm font-semibold flex items-center gap-x-1">
                                        {member.profile.name}
                                        {roleIconMap[member.role]}
                                    </div>
                                    <p className="text-xs text-sinc-500">
                                        {member.profile.email}
                                    </p>
                                </div>
                                {server.profileId !== member.profileId &&
                                    loadingId !== member.id && (
                                        <div className="ml-auto">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <MoreVertical className="h-4 w-4 text-zinc-500 border-none" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side="left">
                                                    <DropdownMenuSub>
                                                        <DropdownMenuSubTrigger className="flex items-center">
                                                            <ShieldQuestion className="w-4 h-4 mr-2" />
                                                            <span>Role</span>
                                                        </DropdownMenuSubTrigger>
                                                        <DropdownMenuPortal>
                                                            <DropdownMenuSubContent>
                                                                <DropdownMenuItem onClick={()=>onRoleChange(member.id,"GUEST")}>
                                                                    <Shield className="w-4 h-4 mr-2" />
                                                                    Guest
                                                                    {member.role === "GUEST" && (
                                                                        <Check className="h-4 w-4 ml-auto" />
                                                                    )}
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={()=>onRoleChange(member.id,"MODERATOR")}>
                                                                    <Shield className="w-4 h-4 mr-2" />
                                                                    Moderator
                                                                    {member.role === "MODERATOR" && (
                                                                        <Check className="h-4 w-4 ml-auto" />
                                                                    )}
                                                                </DropdownMenuItem>
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuPortal>
                                                    </DropdownMenuSub>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={()=>onKick(member.id)}>
                                                        <Gavel className="w-4 h-4 mr-2" />
                                                        Kick
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    )}
                                {loadingId == member.id && (
                                    <Loader className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                                )}
                            </div>
                        ))}
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default MembersModal;
