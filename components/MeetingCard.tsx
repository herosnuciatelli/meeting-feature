import { TablerIcon } from "@tabler/icons-react";

const MeetingCard = ({...props}: React.ComponentProps<"div">) => {
    return (
        <div className="bg-zinc-900 rounded px-6 py-3 border" {...props}/>
    );
};

MeetingCard.Icon = ({ Icon }: { Icon: TablerIcon }) => (
    <div className="py-1.5">
        <Icon size={25} className="stroke-2"/>
    </div>
);

MeetingCard.Title = ({...props}: React.ComponentProps<"h2">) => (
    <h2 className="text-xl font-semibold" {...props} />
);

MeetingCard.Description = ({...props}: React.ComponentProps<"p">) => (
    <p className="opacity-90" {...props} />
);


export { MeetingCard };