"use client";

import { Button } from "@/components/ui/button";
import { CopyTextButton } from "@/components/ui/button-copy";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

const Table = ({ title, description }: { title: string, description: string }) => (
    <div className="flex flex-col items-start gap-1 lg:flex-row">
        <h2 className="text-base font-medium lg:text-xl xl:min-w-32">{title}:</h2>
        <h2 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">{description}</h2>
    </div>
)

const PersonalRoom = () => {
    const { user } = useUser();
    const client = useStreamVideoClient();

    const meetingId = user?.id!;
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
    const router = useRouter();

    const { call } = useGetCallById(meetingId);

    const startRoom = async () => {
        if (!user || !client) return;

        if (!call) {
            const newCall = client.call("default", meetingId!);

            await newCall?.getOrCreate({
                data: {
                    starts_at: new Date().toISOString()
                }
            })
        };
        
        router.push(`/meeting/${meetingId}?personal=true`);
        
    }

    return (
        <section>
            <h1 className="text-3xl font-bold">
                Sala Pessoal
            </h1>

            <div className="flex w-full flex-col gap-8 xl:max-w-[900px] my-6">
                <Table title="Topic" description={`Sala de Reunião de ${user?.fullName}`} />
                <Table title="ID da reunião" description={meetingId} />
                <Table title="Link de Convite" description={meetingLink} />
            </div>

            <div className="flex gap-5">
                <Button onClick={startRoom}>
                    Começar Reunião
                </Button>
                <CopyTextButton contentToBeCopied={meetingLink}>Copiar Convite</CopyTextButton>
            </div>
        </section>
    );
};

export default PersonalRoom;