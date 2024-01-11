import React from "react";
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

function Page() {
  return (
    <div className="flex flex-col text-white justify-center items-center h-screen px-2">
      <h1 className="text-5xl font-bold mb-20">Neuro Nexa</h1>
      <div className="flex space-x-2 text-center">
        <div>
          {/* first */}
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-6 w-6" />
            <h2>Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">{"Explain something to me"}</p>
            <p className="infoText">
              {"What is the difference between a dog and a cat?"}
            </p>
            <p className="infoText">{"What is the color of the sun?"}</p>
          </div>
        </div>
        {/* second */}
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="h-6 w-6" />
            <h2>Capabilities</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">{"Change the GPT Model to use"}</p>
            <p className="infoText">
              {"Message are stored in Firebase's Firestore"}
            </p>
            <p className="infoText">
              {"Hot Toast notification when ChatGPT is thinking!"}
            </p>
          </div>
        </div>
        {/* third */}
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <h2>Limitations</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">
              {"May occasionally generate incorrect information"}
            </p>
            <p className="infoText">
              {
                "May occasionally produce harmful instructions of biased content"
              }
            </p>
            <p className="infoText">
              {"Limited knowledge of world and events after 2021"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
