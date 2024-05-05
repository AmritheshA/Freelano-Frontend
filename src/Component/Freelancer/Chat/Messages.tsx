import { MessageContext, messageType } from "@/Context/MessageContext/MessageProvider";
import { RootState } from "@/Redux/Store";
import { useContext, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";

function Messages() {


    const { sendMessage, receivedMessages ,contactId} = useContext(MessageContext);
    const { user } = useSelector((state: RootState) => state.userDetails);
    const [textInput, setTextInput] = useState("");

    return (
        <>
            {(receivedMessages != null && contactId !="") ?
                <>
                    <div className="px-6 py-4 bg-white shadow-md">
                        <h2 className="text-2xl font-semibold">Chat</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto no-scrollbar  p-6 flex flex-col">
                        {receivedMessages.map((message: messageType) => (
                            message.senderId != user.userId ?
                                < div className="chat chat-start" >
                                    <div className="chat-bubble chat-bubble-info">{message.messageData}</div>
                                </div >

                                : < div className="chat chat-end" >
                                    <div className="chat-bubble chat-bubble-info">{message.messageData}</div>
                                </div >
                        ))}

                    </div >
                    <div className="p-4 bg-white shadow-md flex">
                        <input
                            type="text"
                            value={textInput}
                            onChange={(eve) => setTextInput(eve.target.value)}
                            placeholder="Type your message..."
                            className="w-full px-3 py-2 rounded-lg bg-gray-100 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center" onClick={() => {sendMessage(textInput); setTextInput("") }}>
                            <FiSend size={20} />
                        </button>
                    </div>
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


