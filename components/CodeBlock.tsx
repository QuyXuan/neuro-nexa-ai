import React, { useEffect, useState } from "react";
import Highlight from "react-highlight";

type Props = {
  message: string;
};

function CodeBlock({ message }: Props) {
  const [language, setLanguage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const messageSplit = message.split("\n");
    setLanguage(messageSplit[0]);
    setContent(message.replace(`${messageSplit[0]}\n`, ""));
  }, [message]);

  return (
    <div>
      <div className="flex items-center relative text-gray-200 bg-gray-800 dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md">
        <span className="text-sm">{language}</span>
        <span data-state="closed">
          <button className="flex gap-1 items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z"
                fill="currentColor"
              ></path>
            </svg>
            Copy code
          </button>
        </span>
      </div>
      <Highlight className="mb-8">{content}</Highlight>
    </div>
  );
}

export default CodeBlock;
