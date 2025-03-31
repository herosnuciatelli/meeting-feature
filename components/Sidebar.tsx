"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
    const pathname = usePathname();

    return(
        <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-zinc-950 border-r border-dashed p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
            <div className="flex flex-1 flex-col gap-6">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(link.route + "/");
                    
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn('flex gap-4 items-center px-4 py-2 rounded-md justify-start', {
                                'bg-malibu-600/80': isActive,
                                "hover:bg-malibu-600/10 transition-all": !isActive
                            })}
                        >
                            <link.icon />
                            <p className="text-sm font-semibold max-lg:hidden">{link.label}</p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Sidebar;