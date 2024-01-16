"use client";

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const model = "gpt-3.5-turbo";
  const today = serverTimestamp();

  const sendMessage = async () => {
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;"),
      createdAt: today,
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("NeuroNexa is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input, chatId, model, session }),
    })
      .then((res) => {
        toast.success("NeuroNexa has responded!", { id: notification });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)]">
      <form
        onSubmit={sendMessage}
        className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 lg:mx-auto lg:max-w-2xl xl:max-w-4xl"
      >
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="flex w-full items-center">
            <div className="overflow-hidden [&:has(textarea:focus)]:border-token-border-xheavy [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full dark:border-token-border-heavy flex-grow relative border border-token-border-heavy dark:text-white rounded-2xl bg-white dark:bg-gray-800 shadow-[0_0_0_2px_rgba(255,255,255,0.95)] dark:shadow-[0_0_0_2px_rgba(52,53,65,0.95)]">
              <textarea
                className="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-3 md:pl-4 max-h-[200px] h-[52px] overflow-y-hidden"
                placeholder="Type your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              ></textarea>
              <button
                disabled={!prompt || !session}
                className={`absolute md:bottom-3 md:right-3 dark:hover:bg-gray-900 ${
                  !prompt || !session
                    ? "dark:disabled:bg-transparent disabled:bg-black disabled:opacity-10 disabled:text-gray-400"
                    : "enabled:bg-black text-white"
                } p-0.5 border border-black rounded-lg dark:border-white dark:bg-white bottom-1.5 transition-colors`}
                type="submit"
              >
                <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
