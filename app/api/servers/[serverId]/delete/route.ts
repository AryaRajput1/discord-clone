import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function DELETE(req: Request,{params}:{params:{serverId:string}}) {
    try {

        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if(!params?.serverId){
            return new NextResponse("server id missing", { status:400})
        }


        const server = await db.server.delete({
            where:{
                id:params.serverId,
                profileId:profile.id
            }
        },)

        return NextResponse.json(server)
    } catch (error) {
        console.log("[LEAVE_CHANNEL]", error);
        return new NextResponse(`Internal Error ${error}`, { status: 500 })
    }
}