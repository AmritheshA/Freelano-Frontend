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

export default function VideoCallComponent(): JSX.Element {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const myMeeting = async (element: HTMLDivElement | null): Promise<void> => {
        // generate Kit Token
        const appID = 856049246;
        const serverSecret = '1e5d739db000dbc2d023a43eec1411c3';
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

    return (
        <div
            className="myCallContainer"
            ref={(element) => {
                if (element !== null) {
                    myMeeting(element);
                }
            }}
            style={{ width: '100%', height: '100vh' }}
        ></div>
    );
}