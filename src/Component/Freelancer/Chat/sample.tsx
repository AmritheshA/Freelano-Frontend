import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const Sample = () => {
  const [message, setMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [stompClient, setStompClient] = useState<any>(null);
  const [receivedMessages, setReceivedMessages] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    const socket = new SockJS('http://localhost:7777/connectionEndpoint');

    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log('Connected to server');
      setStompClient(stompClient);
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(`/queue/message/${recipientId}`, (payload: any) => {
        const message = JSON.parse(payload.body);
        console.log("recived msg", message);

        setReceivedMessages((prevReceivedMessages) => {
          const updatedMessages = { ...prevReceivedMessages };
          if (updatedMessages[recipientId]) {
            updatedMessages[recipientId] = [...updatedMessages[recipientId], message];
          } else {
            updatedMessages[recipientId] = [message];
          }
          return updatedMessages;
        });
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, recipientId]);

  const sendMessage = () => {
    if (message.trim() !== '' && recipientId) {
      const messageObj = { message, recipientId };
      stompClient.send(`/app/client-message/${recipientId}`, {}, JSON.stringify(messageObj));
      setMessage('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient ID"
        value={recipientId}
        className="bg-background"
        onChange={(e) => setRecipientId(e.target.value)}
      />
      <ul>
        {receivedMessages[recipientId]?.map((msg: any, index: number) => (
          <li className='bg-red-500' key={index}>{msg.content}</li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        className="bg-background"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Sample;