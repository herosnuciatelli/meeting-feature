"use client";

import { IconCalendar, IconCircleDashedCheck, IconCopy, IconPlus, IconUserStar, IconVideo } from '@tabler/icons-react';
import React, { useState } from 'react';
import { HomeCard } from './HomeCard';
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { ScheduleMeetingButton, StartMeetingButton, valuesType } from './ui/button-meeting';
import { Textarea } from './ui/textarea';

import ReactDatePicker from 'react-datepicker'
import { CopyTextButton } from './ui/button-copy';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';

type ScheduleType = {
    type: "Schedule" | "Schedule-Confirmed";
}

export const MeetingTypeList = () => {
    const [values, setValues] = useState<valuesType>({
        description: "",
        dateTime: new Date(Date.now()),
        link: ""
    })

    const [schedule, setSchedule] = useState<ScheduleType>({type: 'Schedule'})
    const [invite, setInvite] = useState<string>("");
    const router = useRouter();

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Dialog>
                <DialogTrigger asChild>
                    <HomeCard className='bg-rose-600'>
                        <HomeCard.Icon Icon={IconPlus} />
                        <HomeCard.Content>
                            <HomeCard.Title>Nova Reunião</HomeCard.Title>
                            <HomeCard.Description>Começar uma reunião imediata</HomeCard.Description>
                        </HomeCard.Content>
                    </HomeCard>
                </DialogTrigger>
                <DialogContent className='flex flex-col items-center gap-6'>
                    <DialogHeader>
                        <DialogTitle className='text-center'>Começar Reunião Imediatamente</DialogTitle>
                    </DialogHeader>
                    <StartMeetingButton />
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <HomeCard className='bg-blue-600'>
                        <HomeCard.Icon Icon={IconCalendar} />
                        <HomeCard.Content>
                            <HomeCard.Title>Marcar Reunião</HomeCard.Title>
                            <HomeCard.Description>Planeje sua reunião</HomeCard.Description>
                        </HomeCard.Content>
                    </HomeCard>
                </DialogTrigger>
                <DialogContent className='flex flex-col gap-6'>
                    {schedule.type === 'Schedule' ? (
                        <>
                            <DialogHeader>
                                <DialogTitle className='text-center'>Criar Reunião</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-base text-normal leading-[22px]">Adicione uma descrição</label>
                                <Textarea onChange={(e) => setValues({ ...values, description: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <label className="text-base text-normal leading-[22px]">Selecione a data e o horário</label>
                                <ReactDatePicker
                                    selected={values.dateTime}
                                    onChange={(date) => setValues({ ...values, dateTime: date! })}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    className="w-full rounded bg-zinc-900 p-2 focus:outline-none"

                                />
                            </div>
                            <ScheduleMeetingButton values={values} setInvite={setInvite} action={() => setSchedule({...schedule, type: "Schedule-Confirmed"})} />
                        </>
                    ): (
                        <>
                            <DialogHeader className='py-6'>
                                <div className='flex-center'>
                                    <IconCircleDashedCheck size={50} className='animate-bounce text-malibu-500' />
                                </div>
                                <DialogTitle className='text-center'>Reunião Marcada!</DialogTitle>
                            </DialogHeader>
                            <CopyTextButton contentToBeCopied={invite}><IconCopy /> Copiar link da reunião</CopyTextButton>                   
                        </>

                    )}

                </DialogContent>
            </Dialog>


            <HomeCard className='bg-purple-600' onClick={() => router.push("/recordings")}>
                <HomeCard.Icon Icon={IconVideo} />
                <HomeCard.Content>
                    <HomeCard.Title>Ver Gravações</HomeCard.Title>
                    <HomeCard.Description>Confira suas gravações</HomeCard.Description>
                </HomeCard.Content>
            </HomeCard>
            
            <Dialog>
                <DialogTrigger asChild>
                    <HomeCard className='bg-yellow-600'>
                        <HomeCard.Icon Icon={IconUserStar} />
                        <HomeCard.Content>
                            <HomeCard.Title>Acessar Reunião</HomeCard.Title>
                            <HomeCard.Description>Através de um link</HomeCard.Description>
                        </HomeCard.Content>
                    </HomeCard>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className='flex-center'>
                        <DialogTitle>Entrar em uma Reunião</DialogTitle>
                    </DialogHeader>
                    <Input placeholder='Link da reunião' value={values.link} onChange={(e) => setValues({...values, link: e.target.value})} />
                    <Button onClick={() => router.push(values.link)}>Entrar na Reunião</Button>
                </DialogContent>
            </Dialog>

        </section>
    );
}