"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MeetingCard } from "./MeetingCard";
import { IconCalendarTime, IconCopy } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { CopyTextButton } from "./ui/button-copy";
import { Loader } from "./Loader";
import { toast } from "sonner";

export const CallList = ({type}: {
    type: "ended" | "upcoming" | "recordings"
}) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading} = useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([])

    const router = useRouter();

    const getCalls = () => {
        switch (type) {
            case "ended":
                return endedCalls;
            case "recordings":
                return recordings;
            case "upcoming":
                return upcomingCalls;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case "ended":
                return "Sem histórico ainda.";
            case "recordings":
                return "Sem gravações ainda.";
            case "upcoming":
                return "Sem agendamentos ainda.";
            default:
                return "";
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            if (!callRecordings) return;
            try {
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))

                const recordings = callData
                    .filter(call => call.recordings.length > 0)
                    .flatMap(call => call.recordings)
    
                setRecordings(recordings);
            } catch (err) {
                toast("Tente novamente mais tarde")
            }

        }

        if (type === "recordings") fetchRecordings();
    }, [type, callRecordings])

    const noCallsMessage = getNoCallsMessage();
    const calls = getCalls();

    if (isLoading) return <Loader />

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls?.length > 0 ? calls?.map((meeting: Call | CallRecording) => {
                const invite = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`;
                const title = (meeting as Call).state?.custom?.description?.substring(0, 20) || (meeting as CallRecording)?.filename?.substring(0, 20) || "Reunião Pessoal";
                const description = (meeting as Call)?.state?.startsAt?.toLocaleString("pt-BR") || (meeting as CallRecording).start_time;
                return (
                    //(meeting as Call).state?.custom.description.substring(0, 20) ||
                    //(meeting as Call).state?.startsAt?.toLocaleString("pt-BR") ||
                    <MeetingCard key={(meeting as Call).id || (meeting as CallRecording).url}>
                        <MeetingCard.Icon Icon={IconCalendarTime} />
                        <MeetingCard.Title>{title}</MeetingCard.Title>
                        <MeetingCard.Description>{description}</MeetingCard.Description>
                        {type !== "ended" && (
                            <div className="flex items-center gap-3 mt-3">
                                <Button variant={"secondary"} size={"sm"} onClick={() => {
                                    if(type === "upcoming") router.push(invite)
                                    else router.push((meeting as CallRecording).url)
                                }}>{type === "upcoming" ? "Começar" : "Assistir"}</Button>
                                <CopyTextButton contentToBeCopied={type === "upcoming" ? invite : (meeting as CallRecording).url} size={"sm"} variant={"secondary"}><IconCopy />Copiar link</CopyTextButton>
                            </div>
                        )}
                    </MeetingCard>
                )}): (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    );
};