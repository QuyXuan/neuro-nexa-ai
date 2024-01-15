import { DocumentData } from "firebase-admin/firestore";
import Image from "next/image";
import CodeBlock from "./CodeBlock";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatBotRender = message.user.name === "NeuroNexa";

  const extractCodeBlocks = (text: string) => {
    const regex = /(?:```([\s\S]*?)```|`([^`]+)`|([^`]+))/g;
    let match;
    let result = [];

    while ((match = regex.exec(text)) !== null) {
      if (match[1] !== undefined) {
        result.push({ content: match[1].trim(), type: "code" });
      } else if (match[2] !== undefined) {
        if (result.length > 0 && result[result.length - 1].type === "text") {
          result[result.length - 1].content = `<p>${result[
            result.length - 1
          ].content.replace(
            /^<p>|<\/p>$/g,
            ""
          )}<code style="font-size: .875em; font-weight: 600; color: #1c93ed;"> ${escapeHtml(
            match[2].trim()
          )} </code></p>`;
        } else {
          result.push({
            content: `<p><code style="font-size: .875em; font-weight: 600; color: #1c93ed;"> ${escapeHtml(
              match[2].trim()
            )} </code></p>`,
            type: "text",
          });
        }
      } else if (match[3] !== undefined) {
        if (result.length > 0 && result[result.length - 1].type === "text") {
          result[result.length - 1].content = `<p>${result[
            result.length - 1
          ].content.replace(/^<p>|<\/p>$/g, "")}${match[3].trim()}</p>`;
        } else {
          result.push({
            content: `<p>${match[3].trim()}</p>`,
            type: "text",
          });
        }
      }
    }
    return result;
  };

  const escapeHtml = (content: string) => {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  return (
    <div className={`py-5 text-white ${isChatBotRender && "bg-[#434654]"}`}>
      <div className="flex space-x-5 max-w-4xl mx-auto">
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
        <div className="flex flex-col">
          {extractCodeBlocks(message.text).map((textCode, index) =>
            textCode.type === "text" ? (
              <div
                key={index}
                className="mb-2"
                dangerouslySetInnerHTML={{ __html: textCode.content }}
              />
            ) : (
              <CodeBlock
                key={`${textCode.type}${index}`}
                message={textCode.content}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
