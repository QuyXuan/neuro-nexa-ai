"use client";

import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();
  const messageRef = useRef<HTMLDivElement>(null);

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scroll">
      {messages?.empty && (
        <div className="h-[calc(100vh-72px)] flex flex-col items-center justify-center text-center gap-8">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/neuro-nexa.appspot.com/o/black-gpt.png?alt=media&token=1e719424-c08f-4961-b936-ba772fdac218"
            className="h-[72px]"
            alt="gpt-icon"
            width={72}
            height={72}
          />
          <p className="text-white text-center text-2xl font-medium">
            NeuroNexa is powered by GPT-3.5 Start a conversation to get started!
          </p>
        </div>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
      <div ref={messageRef} />
    </div>
  );
}

export default Chat;
