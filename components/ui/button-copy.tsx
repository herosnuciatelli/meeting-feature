import { toast } from "sonner";
import { Button, ButtonProps } from "./button";

export const CopyTextButton = ({ children, contentToBeCopied, ...props }: ButtonProps & { contentToBeCopied: string }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        toast("Conteúdo copiado.")
    }
    
    return (
        <Button variant={"outline"} onClick={() => handleCopy(contentToBeCopied)} {...props}>{children}</Button>
    );
}