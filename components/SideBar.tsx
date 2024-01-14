"use client";

import React from "react";
import NewChat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Image from "next/image";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  return (
    <div className="p-2 flex flex-col h-screen gap-1">
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <NewChat />
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>
      {session && (
        <Image
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="avatar"
          className="rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          width="48"
          height="48"
        />
      )}
    </div>
  );
}

export default SideBar;
