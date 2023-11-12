import { FC, FormEvent, useState } from "react";

import styles from "./Webchat.module.scss";

import useWebSocket from "react-use-websocket";

import { WEBSOCKET_SERVER_URL } from "../../const/ws-server";
import { eventType } from "../../types/event-type";

const Webchat: FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleMessage = (messageEvent: MessageEvent) => {
    const { event, data } = JSON.parse(messageEvent.data);

    switch (event) {
      case eventType.message:
        setMessages(messages.concat(data));
    }
  };

  const { sendJsonMessage } = useWebSocket(WEBSOCKET_SERVER_URL, {
    onMessage: handleMessage,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = event.currentTarget.elements.message.value;

    sendJsonMessage({
      event: "message",
      data: message,
    });

    event.target.elements.message.value = "";
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.length > 0 ? (
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        ) : (
          <div>Нет сообщений</div>
        )}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <button>Отправить сообщение</button>
      </form>
    </div>
  );
};

export default Webchat;
