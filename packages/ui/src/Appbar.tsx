import { Button } from "./button";
import Link from 'next/link'
interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return (
        <div className="flex justify-between border-b px-4 items-center bg-white shadow-md">
            <Link href='/'>
                <div className="text-lg font-bold flex flex-col justify-center">
                    PayTM
                </div>
            </Link>
            <div className="flex flex-col justify-center pt-2">
                <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    )
}