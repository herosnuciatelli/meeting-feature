import { DeviceSettings, useCall, useCallStateHooks, useDeviceList, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

export const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
    const call = useCall();

    const [isCamMicDisabled, setIsCamMicDisabled] = useState<boolean>(false);
    const [isCameraAvailable, setIsCameraAvailable] = useState<boolean>(false);
    const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState<boolean>(false);

    const { useCameraState } = useCallStateHooks();
    const { camera, hasBrowserPermission: hasBrowserPermissionToCamera } = useCameraState();

    const { useMicrophoneState } = useCallStateHooks();
    const { microphone, hasBrowserPermission: hasBrowserPermissionToMicrophone } = useMicrophoneState();

    if (!call) {
        throw new Error("usecall must be used within StreamCall component");
    }

    useEffect(() => {
        if (hasBrowserPermissionToCamera) {
            const cameraDevice = () => {
                camera.listDevices().forEach(e => {
                    if (e.length > 0) setIsCameraAvailable(true);
                });
        
                if(isCameraAvailable) {
                    if (isCamMicDisabled) {
                        camera.disable();
                    } else {
                        camera.enable();
                    };
                };
            }
    
            cameraDevice();
        }

        if (hasBrowserPermissionToMicrophone) {
            const microphoneDevice = async () => {
                microphone.listDevices().forEach(e => {
                    if (e.length > 0) setIsMicrophoneAvailable(true);
                });

                if(isMicrophoneAvailable) {
                    if (isCamMicDisabled) {
                        await microphone.disable();
                    } else {
                        await microphone.enable();
                    };
                };
            }
    
            microphoneDevice();
        }
    }, [isCamMicDisabled])  

    return(
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
            <h1 className="text-2xl font-bold">Sua configuração inicial</h1>

            <div className="p-4 rounded flex-center border border-dashed w-full max-w-md">
                <VideoPreview className="min-h-60 flex-center w-full" />
            </div>
            
            <div className="flex h-16 items-center justify-center gap-3">
                <label className="flex items-center justify-center gap-2 font-medium select-none">
                    <Checkbox
                        className="cursor-pointer"
                        checked={isCamMicDisabled}
                        onCheckedChange={() => setIsCamMicDisabled(!isCamMicDisabled)}
                    />
                    Entrar com a câmera e o microfone desabilitados
                </label>
                <DeviceSettings />
            </div>
            <Button onClick={() => {
                call.join();
                setIsSetupComplete(true);
            }}>
                Entrar na reunião
            </Button>
        </div>
    );
};