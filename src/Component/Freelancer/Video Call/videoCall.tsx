import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

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

interface AppProps { }

const VideoCall: React.FC<AppProps> = () => {
    const roomID = getUrlParams().get('roomID') || randomID(5);

    const myMeeting = async (element: HTMLDivElement | null) => {
        // generate Kit Token
        const appID = 2008883758;
        const serverSecret = '096ed466d199c916e6c7ed44df687d85';
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            randomID(5),
            randomID(5)
        );

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy The link',
                    url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
                },
            ],
            showTextChat:true,
            maxUsers:2,
            layout:"Auto",
            turnOnCameraWhenJoining:true,
            scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall }, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        });
    };

    return (
        <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: '100vw', height: '100vh' }}
        ></div>
    );
};

export default VideoCall;