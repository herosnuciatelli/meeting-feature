import { cn } from "@/lib/utils"

export type PingProps = {
    color: "malibu" | "rose"
}

export const Ping = ({ color }: PingProps) => (
    <span className="relative flex h-3 w-3">
        <span className={cn(`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`, {
            "bg-malibu-600": color === "malibu",
            "bg-rose-600": color === "rose"
        })}></span>
        <span className={cn(`relative inline-flex rounded-full h-3 w-3 bg-${color}-500`, {
            "bg-malibu-500": color === "malibu",
            "bg-rose-500": color === "rose"
        })}></span>
    </span>
)