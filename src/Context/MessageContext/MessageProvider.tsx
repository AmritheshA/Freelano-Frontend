import React, { createContext, useEffect, useState, Dispatch, SetStateAction } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";


interface ContactType {
  contactsId: string;
  userName: string;
  userProfile: string;
  lastUpdatedTime: string;
  lastUpdatedMessage: string;
}

export interface messageType {
  contactId: string;
  senderId: string
  messageType: string;
  messageData: string;
  role: string;
  timestamp: Date;
  isRead: boolean;
  chatRoomId?: string;
}

interface MessageContextValue {
  receivedMessages: messageType[];
  sendMessage: (recipientId: string) => void;
  setReceivedMessages: Dispatch<SetStateAction<messageType[]>>;
  contacts: ContactType[];
  setContacts: (contacts: ContactType[] | ((prevContacts: ContactType[]) => ContactType[])) => void;
  contactId: string | undefined;
  setContactId: Dispatch<string>;
}

export const MessageContext = createContext<MessageContextValue>({
  receivedMessages: [], setReceivedMessages: () => { }, sendMessage: () => { }, contacts: [], setContacts: () => { }, contactId: "", setContactId: () => { }
});

interface MessageProviderProps {
  children: React.ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {

  const [stompClient, setStompClient] = useState<any>(null);
  const user = useSelector((state: RootState) => state.userDetails.user);
  const [receivedMessages, setReceivedMessages] = useState<messageType[]>([]);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [contactId, setContactId] = useState("");


  useEffect(() => {
    const socket = new SockJS(`${import.meta.env.VITE_LOCALHOST_URL}`);
    const stompClient = Stomp.over(socket);
    if (user) {
      stompClient.connect({}, () => {
        console.log('Connected to server');
        setStompClient(stompClient);
      })
    }
    else {
      stompClient.disconnect();
      console.log("disconnected from server");
    }
  }, [user]);


  useEffect(() => {
    if (stompClient && user) {
      const subscription = stompClient.subscribe(`/queue/message/${user.userId}`, (payload: any) => {
        const message = JSON.parse(payload.body) as messageType;
        if (message) {
          setReceivedMessages(prevMessages => [...prevMessages, message]);
        }
        if (user.userId != contactId) {
          markMessageAsRead(message?.chatRoomId)
        }
      });

      return () => {
        subscription?.unsubscribe();
      };
    }
  }, [user, stompClient]);


  useEffect(() => {
    console.log("subscribing read-message");
    if (stompClient && user) {
      const readMessage = stompClient.subscribe(`/queue/read-message/${user.userId}`, (payload: any) => {
        const messageId = JSON.parse(payload.body);

        if (user.userId != contactId) {
          setReceivedMessages((prevMsg) =>
            prevMsg.map((msg) => msg.chatRoomId == messageId ? { ...msg, isRead: true } : msg))
        }
      })
      return () => {
        readMessage?.unsubscribe();
      };
    }
  }, [user, stompClient]);


  const sendMessage = (message: string) => {

    const messageObj: messageType = { messageData: message, senderId: user.userId, role: user.role, contactId, messageType: typeof message, timestamp: new Date(), isRead: false };
    setReceivedMessages(prevMessages => [...prevMessages, messageObj]);
    stompClient.send(
      `/app/client-message/${contactId}`,
      {},
      JSON.stringify(messageObj)
    );
  };

  const markMessageAsRead = (messageId: string | undefined) => {

    stompClient.send(`/app/read-message/${messageId}`, {},
      JSON.stringify({ messageId })
    );
  };

  return (
    <MessageContext.Provider value={{ receivedMessages, sendMessage, setReceivedMessages, contacts, setContacts, contactId, setContactId }}>
      {children}
    </MessageContext.Provider>
  )
}
