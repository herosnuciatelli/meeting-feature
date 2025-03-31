"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "./button"
import { Ping } from "./ping"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type {StreamVideoClient} from "@stream-io/video-react-sdk";

export type valuesType = {
    dateTime: Date;
    description: string;
    link: string;
}

const createCall: ({ client, values }: {
    client: StreamVideoClient;
    values: valuesType;
}) => Promise<{call: Call}> = async ({client, values}) => {
    const id = crypto.randomUUID();
    const call = client.call("default", id);

    if (!call) throw new Error("Failed to create a call");

    const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();

    const description = values.description || "Reunião Imediata";

    await call.getOrCreate({
        data: {
            starts_at: startsAt,
            custom: {
                description
            }
        }
    });

    return {call};
}

export const StartMeetingButton = () => {
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState<valuesType>({
        dateTime: new Date(),
        description: "",
        link: "",
    });

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createMeeting = async () => {
        setIsLoading(true);
        if (!client || !user) return;

        try {
            if (!values.dateTime) {
                toast("Por favor, selecione a data e horário.");
            }

            const { call } = await createCall({ client, values });

            if(!values.description) {
                router.push(`/meeting/${call.id}`);
            };

            toast("Reunião Criada.");
        } catch (err) {
            console.log(err);
            toast("Falha em iniciar a reunião");
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <Button 
            className='w-max' 
            variant={'outline'} 
            onClick={createMeeting}
            isLoading={isLoading}
            ping={{ color: "rose" }}
        >
            Iniciar
        </Button>
    )
};

export const ScheduleMeetingButton = ({ action, values, setInvite }: { action: () => void, values: valuesType, setInvite: (invite: string) => void }) => {
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const scheduleMeeting = async () => {
        if (!client || !user) return;

        try{
            setIsLoading(true)
            const { call } = await createCall({ client, values })

            const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`
            setInvite(meetingLink)

            action();
            
            toast("Reunião marcada.")
        } catch (err) {
            console.log(err);
            toast("Falha ao tentar marcar reunião");
            setIsLoading(false);
        }
    };
    return(
        <Button variant={"third"} onClick={scheduleMeeting} isLoading={isLoading}>Marcar Reunião</Button>
    );
};