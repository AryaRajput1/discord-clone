'use client';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from 'axios';


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";


function DeleteServerModal() {
    const {isOpen,type,onClose,data,onOpen} = useModal()
    const {server} =data;
    const router=useRouter()
    const isModalOpen = isOpen && type==='deleteServer';
    const [isLoading,setIsLoading] = useState(false);
    const onConfirm =async ()=>{
        try {
            setIsLoading(true);
            await axios.delete(`/api/servers/${server?.id}/delete`);

            onClose();
            router.refresh();
            router.push('/')

            
        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }
    return (
        <div>
            <Dialog open={isModalOpen} onOpenChange={onClose} >
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center">Delete Server</DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                            Are you sure you want to do this? <span className="font-semibold text-indigo-500 ">
                                {server?.name}
                            </span> will be permanently deleted.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="bg-gray-100 px-6 py-4">
                        <div className="flex items-center justify-between w-full">
                            <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                            >
                                Cancel
                            </Button>
                            <Button
                            disabled={isLoading}
                            onClick={onConfirm}
                            variant="primary"
                            >
                                Confirm
                            </Button>


                        </div>

                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DeleteServerModal