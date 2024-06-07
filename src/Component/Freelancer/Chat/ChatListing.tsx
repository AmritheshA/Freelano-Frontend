import axiosInstance from "@/Config/AxiosConfig/axiosConfig";
import { RootState } from "@/Redux/Store";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import notFountImage from "@/assets/freelancer/chatNotFount.jpeg"
import { MessageContext } from "@/Context/MessageContext/MessageProvider";


function ChatListing() {

    const [loading, setLoading] = useState(false);
    const { contacts, setContacts, setReceivedMessages, receivedMessages, contactId, setContactId } = useContext(MessageContext);
    const user = useSelector((state: RootState) => state.userDetails.user);


    useEffect(() => {

        const fetchMessage = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            if (contactId) {
                const response = await axiosInstance.get(`/api/v1/chat/getAllMessageByContactId?contactId=${contactId}`, config);
                setReceivedMessages(response.data);
            }
        }
        fetchMessage();
    }, [contactId]);

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        setLoading(true);
        axiosInstance.get(
            `/api/v1/chat/getContacts?userId=${user.userId}&role=${user.role}`,
            config
        )
            .then((response) => {
                setLoading(false);
                const data = response.data;
                setContacts(data);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    }, []);

    const handleContactClick = async (id: string) => {
        setContactId(id);

        const responce = await axiosInstance.put(`/api/v1/chat/markAsRead?contactId=${id}&userId=${user.userId}`);

        if (responce.data) {
            setReceivedMessages((prevMessages) =>
                
                prevMessages.map((message) =>
                ({
                    ...message, isRead: true
                })))
        }
        console.log(receivedMessages);

    }

    let unreadMessageLeng = receivedMessages.filter((message) => message.isRead == false).length;

    return (
        <div className="no-scrollbar overflow-y-auto h-[86%]">
            {loading ?
                <div className="flex justify-between p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
                    <div className="flex gap-3 items-start">
                        <div className="skeleton avatar">
                            <div className="w-10 rounded-full bg-gray-300"></div>
                        </div>
                        <div className="flex flex-col gap-2">

                            <span className="skeleton font-semibold text-lg h-4 w-44 bg-gray-300"></span>
                            <span className="skeleton font-semibold text-lg h-4 w-32 bg-gray-300"></span>
                        </div>
                    </div>
                    <div className="skeleton h-4 w-10 bg-gray-300"></div>
                </div>
                :
                (contacts == null || contacts?.length == 0) ?
                    <div className="h-full border-0 flex-1 flex justify-center items-center bg-white">
                        <img
                            src={notFountImage}
                            className="max-h-full max-w-full"
                            alt="Chat Image"
                        />
                    </div> :
                    contacts?.map((contact) => (
                        <div
                            key={contact.contactsId}
                            className="flex justify-between p-4  hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                            onClick={() => handleContactClick(contact.contactsId)} >

                            <div className="flex gap-3 items-start">
                                <div className="avatar online">
                                    <div className="w-10 rounded-full">
                                        <img src={contact.userProfile} />
                                    </div>
                                </div>

                                <div className="flex flex-col items-start">
                                    <div className="flex gap-2">
                                        <span className="font-semibold text-lg">{contact.userName}</span>
                                        {unreadMessageLeng != 0 &&
                                            <div className="badge">
                                                {unreadMessageLeng}
                                            </div>}
                                    </div>
                                    <span className="font-medium text-sm">{contact.lastUpdatedMessage}</span>
                                </div>
                            </div>
                            {contact?.lastUpdatedTime}
                        </div>
                    ))}
        </div>
    )
}

export default ChatListing