import Link from "next/link";
import React from "react";

import { MobileNav } from "./MobileNav";
import { Icons } from "./Icons";
import { SignedIn, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
    return (
        <nav className="flex-between fixed z-50 w-full px-6 py-4 lg:px-10 bg-zinc-950 border-b border-dashed">
            <Link href={"/"} className="flex items-center gap-1.5">
                <Icons.logo className="size-6" />
                <p className="text-xl font-extrabold text-white max-sm:hidden">Cronus</p>
            </Link>
            <div className="flex-between gap-5">
                {/* Clerk - User Management */}
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <MobileNav />
            </div>
        </nav>
    );
};