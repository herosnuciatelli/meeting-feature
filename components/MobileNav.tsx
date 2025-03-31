"use client";

import React from "react";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { IconMenu } from "@tabler/icons-react";
import Link from "next/link";

import { Icons } from "./Icons";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
  

export const MobileNav = () => {
    const pathname = usePathname();

    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger className="flex items-center">
                    <IconMenu className="cursor-pointer sm:hidden" />
                </SheetTrigger>
                <SheetContent side="left" className="px-6 py-4">
                    <SheetTitle>
                        <div className="flex items-center gap-1.5">
                            <Icons.logo className="size-6" />
                            <p className="text-xl font-extrabold text-white">Cronus</p>
                        </div>
                    </SheetTitle>
                    <div className="flex flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className="flex h-full flex-col gap-6 pt-16 text-white">
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.route || pathname.startsWith(link.route + "/");
                                    
                                    return (
                                        <SheetClose key={link.route} asChild>
                                            <Link
                                                href={link.route}
                                                key={link.label}
                                                className={cn('flex gap-4 items-center px-4 py-2 rounded-md w-full', {
                                                    'bg-sky-500/80': isActive,
                                                    "hover:bg-sky-500/10 transition-all": !isActive
                                                })}
                                            >
                                                <link.icon />
                                                <p className="text-sm font-semibold">{link.label}</p>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                            </section>
                        </SheetClose>
                    </div>

                </SheetContent>
            </Sheet>

        </section>
    );
};