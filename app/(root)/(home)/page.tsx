import { MeetingTypeList } from "@/components/MeetingTypeList";
import { DateTime } from "@/utils/date";
import React from "react";

const Home = () => {
    const time = DateTime.getCurrentTime();
    const date = DateTime.getCurrentDate();

    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <div className="h-[300px] w-full rounded-sm bg-gradient-to-tr from-malibu-600/80 to-malibu-950 shadow-lg shadow-malibu-800/50 bg-cover">
                <div className="flex h-full flex-col justify-between max-lg:px-5 max-lg:py-8 lg:p-11">
                    <h2 className="bg-zinc-900 w-max px-2.5 py-1.5 rounded border border-dashed text-sm font-semibold">Reunião marcada às: 12:30 PM</h2>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold lg:text-7xl">
                            {time}
                        </h1>
                        <p className="text-lg font-medium text-zinc-200 lg:text-2xl">{date}</p>
                    </div>
                </div>
            </div>

            <MeetingTypeList />
        </section>
    );
};

export default Home;