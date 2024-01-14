import { DocumentData } from "firebase-admin/firestore";
import Image from "next/image";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatBotRender = message.user.name === "NeuroNexa";

  return (
    <div className={`py-5 text-white ${isChatBotRender && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <Image
          src={`${
            isChatBotRender
              ? "https://firebasestorage.googleapis.com/v0/b/neuro-nexa.appspot.com/o/green-gpt.png?alt=media&token=a4e8799d-8d9a-4d38-a2e0-82ef19d5eefd"
              : message.user.avatar
          }`}
          className="h-6 rounded-full"
          width="24"
          height="24"
          alt="avatar"
        />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
