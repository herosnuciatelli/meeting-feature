import { IconLoader2 } from "@tabler/icons-react";

export const Loader = () => {
    return (
        <div className="flex-center h-screen w-full">
            <IconLoader2 className="animate-spin" size={50}/>
        </div>
    );
};