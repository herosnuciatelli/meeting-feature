"use client";

import { cn } from "@/lib/utils";
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import { IconLayout, IconUsers } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { EndCallButton } from "./EndCallButton";
import { Loader } from "./Loader";

type CallLayoutType = "grid" | "speaker-right" | "speaker-left"

export const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get("personal");

    const router = useRouter();

    const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
    const [showParticipants, setShowParticipants] = useState<boolean>(false);

    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) return <Loader />;

    const CallLayout = () => {
        switch(layout) {
            case "grid":
                return <PaginatedGridLayout />
            case "speaker-right":
                return <SpeakerLayout participantsBarPosition="left" />
            case "speaker-left":
                return <SpeakerLayout participantsBarPosition="right" />
        }
    }

    return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div className={cn("h-[calc(100vh-86px)] hidden ml-2", {
                    "block": showParticipants
                })}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>

            <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
                <CallControls onLeave={() => {
                    router.push('/')
                }} />

                <CallStatsButton />

                <span className="h-10 w-0.5 bg-zinc-800 rounded"></span>

                <DropdownMenu>
                    <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
                        <IconLayout />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Escolher Layout</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {[{label: "Grid", value: "grid"}, {label: "Falante-Esquerda", value: "speaker-left" } , {label: "Falante-Direita", value: "speaker-right" }].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem onClick={() => {
                                    setLayout(item.value as CallLayoutType)
                                }}>
                                    {item.label}
                                </DropdownMenuItem>
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                
                
                <Button variant={"ghost"} onClick={() => setShowParticipants((prev) => !prev)}>
                    <div className="cursor-pointer rounded-2xl">
                        <IconUsers size={20} />
                    </div>
                </Button>

                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    )
}