import { cn } from "@/lib/utils"
import type { TablerIcon } from "@tabler/icons-react";
import { DetailedHTMLProps, HTMLAttributes } from "react"

const HomeCard = ({className, children, ...rest}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    return (
        <div 
            className={cn("px-4 py-6 flex flex-col justify-between w-full xl:max-w[270px] min-h-[260px] rounded-md cursor-pointer", className)}
            {...rest}
        >{children}</div>
    );
};

HomeCard.Icon = ({ Icon }: { Icon: TablerIcon }) => (
    <div className="flex-center bg-malibu-100/20 size-12 rounded-sm">
        <Icon size={27} />
    </div>
);

HomeCard.Content = ({ children, ...rest}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
    <div className="flex flex-col justify-start gap-2" {...rest}>{children}</div>
)

HomeCard.Title = ({ children, ...rest}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
    <h1 className="text-2xl font-bold" {...rest}>{children}</h1>
)

HomeCard.Description = ({ children, ...rest}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
    <p className="text-lg font-normal" {...rest}>{children}</p>
)

export { HomeCard };