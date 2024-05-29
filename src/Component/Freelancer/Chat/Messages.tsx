import { MessageContext, messageType } from "@/Context/MessageContext/MessageProvider";
import { RootState } from "@/Redux/Store";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { SlPicture } from "react-icons/sl";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { Check, CheckCheck } from "lucide-react";


function Messages() {

    const { sendMessage, receivedMessages, contactId, contacts } = useContext(MessageContext);
    const { user } = useSelector((state: RootState) => state.userDetails);
    const [textInput, setTextInput] = useState("");
    const scrollableElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollableElement = scrollableElementRef.current;
        if (scrollableElement) {
            scrollableElement.scrollTop = scrollableElement.scrollHeight;
        }
    });

    return (
        <>
            {(receivedMessages != null && contactId != "") ?
                <>
                    <div className="px-6 py-4 bg-white shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="avatar online">
                                <div className="w-10 rounded-full">
                                    <img src={contacts.find((contact) => contact.contactsId === contactId)?.userProfile} />
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold">{contacts.find((contact) => contact.contactsId === contactId)?.userName}</h2>
                        </div>
                    </div>
                    <div ref={scrollableElementRef} id="scrollableElement" className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col bg-[url('https://lh3.googleusercontent.com/SZ97RCEv5EVH6iMCDIdHeGJM_BNyHYcnRQ4EdK4V_VyVxLlQS8GY1U3xB8atEBH55OM=h310')]">
                        {receivedMessages.map((message: messageType) =>
                            message.senderId !== user.userId ? (
                                <div className="flex flex-col chat chat-start">
                                    <div className="chat chat-start">
                                        <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                            </div>
                                        </div>
                                        <div className="chat-bubble min-w-[110px]">
                                            {message.messageData}
                                            <div className="flex justify-end">
                                                <span className="text-gray-500 text-sm">{formatDateAndConvert(new Date(message.timestamp))}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col chat chat-end">
                                    <div className="chat chat-start">
                                        <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                            </div>
                                        </div>
                                        <div className="chat-bubble chat-bubble-accent min-w-[120px] max-w-[300px]">
                                            <div className="flex flex-col">
                                                <h1 className="max-w-[250px] break-words">{message.messageData}</h1>
                                                <div className="flex justify-end gap-1">
                                                    <span className="text-gray-500 text-sm">{formatDateAndConvert(new Date(message.timestamp))}</span>
                                                    {message.isRead ? <CheckCheck className="h-5" /> : <Check className="w-4 h-4" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <div className="p-4 bg-white shadow-md flex items-center gap-2">

                        <SpeedDial
                            ariaLabel="SpeedDial example"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-paperclip w-5 cursor-pointer" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rn:" data-state="closed"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>}
                            className="ml-2 h-10"
                        >
                            <SpeedDialAction
                                icon={<FaFileAlt size={20} />}
                                tooltipTitle="Documents"
                                onClick={() => {
                                    setTextInput(textInput + "😊");
                                }}
                            />
                            <SpeedDialAction
                                icon={<SlPicture size={20} />}
                                tooltipTitle="Picture"
                                onClick={() => {
                                    setTextInput(textInput + "😊");
                                }}
                            />
                        </SpeedDial>

                        <input
                            type="text"
                            value={textInput}
                            onChange={(eve) => setTextInput(eve.target.value)}
                            placeholder="Type your message..."
                            className="w-full px-3 py-2 rounded-lg bg-gray-100 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                            onClick={() => {
                                if (textInput != "") {
                                    sendMessage(textInput);
                                    setTextInput("");
                                } else {
                                    toast.error("Message Is Empty")
                                }
                            }}
                        >
                            <FiSend size={20} />
                        </button>
                    </div>
                    <Toaster />
                </> :
                <div className="flex-1 flex justify-center items-center bg-white">
                    <img
                        src="https://img.freepik.com/premium-vector/online-communication-with-mobile-phone-concept-receiving-messages-comments-likes-emojis-internet-chat-social-media-smartphone-messenger-flat-vector-illustration-isolated-white-background_198278-18915.jpg"
                        className="max-h-full max-w-full"
                        alt="Chat Image"
                    />
                </div>
            }
        </>
    )
}

export default Messages


const formatDateAndConvert = (date: Date) => {

    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        date = new Date();
    }

    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();

    let meridiem: string = hours >= 12 ? 'PM' : 'AM';

    let hour: number = hours >= 12 ? hours - 12 : hours;

    let minutesString: string = minutes < 10 ? '0' + minutes : minutes.toString();
    let timeString: string = `${hour}.${minutesString} ${meridiem}`;
    return timeString;
}
