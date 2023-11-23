import InitialModal from '@/components/modals/initialModal';
import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation';
import React from 'react'

async function SetupPage() {
    const profile = initialProfile();

    const server =await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile?.id
                }
            }
        }
    })

    if (server) {
        console.log(server)
        return redirect(`/servers/${server.id}`)
    }
    return (
        <InitialModal/>
    )
}

export default SetupPage