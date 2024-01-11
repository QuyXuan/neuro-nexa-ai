import React from "react";
import NewChat from "./NewChat";

function SideBar() {
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* new chat */}
          <NewChat />
          <div>{/* Model selection */}</div>
          {/* map through chat row */}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
