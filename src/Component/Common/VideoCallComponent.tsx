import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect, useRef } from 'react';

function randomID(len: number): string {
    let result = '';
    if (result) return result;
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    len = len || 5;
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export function getUrlParams(url = window.location.href): URLSearchParams {
    const urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
}

export default function VideoCallComponent(): JSX.Element {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const myMeeting = async (element: HTMLDivElement | null): Promise<void> => {
            // generate Kit Token
            const appID = 985686886;
            const serverSecret = 'f627cef240475f1c014e56a7d9d15a0b';
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

            // Create instance object from Kit Token.
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            // start the call
            zp.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: 'Personal link',
                        url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
            });
        };

        if (containerRef.current) {
            myMeeting(containerRef.current);
        }
    }, []);

    return (
        <div
            className="myCallContainer"
            ref={containerRef}
            style={{ width: '100%', height: '80vh' }}>
        </div>
    );
}