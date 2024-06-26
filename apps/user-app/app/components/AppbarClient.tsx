"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

const AppbarClient = () => {
    const session = useSession();
    const router = useRouter();
    return (
        <div className='border-b border-b-gray-300'>
            <Appbar onSignin={signIn} onSignout={async () => {
                await signOut();
                router.push("/api/auth/signin");
            }} user={session.data?.user}/>
        </div>
    );
};

export default AppbarClient;