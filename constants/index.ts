import { Icon, IconCalendar, IconGeometry, IconHistoryToggle, IconPlus, IconVideo, type IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const sidebarLinks: {
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>,
    label: string,
    route: string
}[] = [
    {
        label: "Home",
        icon: IconGeometry,
        route: "/",
    },
    {
        label: "Agenda",
        icon: IconCalendar,
        route: "/upcoming"
    },
    {
        label: "Histórico",
        icon: IconHistoryToggle,
        route: "/previous"
    },
    {
        label: "Gravações",
        icon: IconVideo,
        route: "/recordings"
    },
    {
        label: "Sala Pessoal",
        icon: IconPlus,
        route: "/personal-room"
    },
];