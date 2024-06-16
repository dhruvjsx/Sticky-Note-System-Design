import React, { forwardRef } from "react";

const Note =forwardRef( ({ content,initPos, ...props },ref) => {
  return (
    <div
    ref={ref}
      style={{
        position: "absolute",
        left:`${initPos?.x}px`,
        top: `${initPos?.y}px`,
        border: "1px solid black",
        userSelect:"none",
        padding:"10px",
        width:"200px",
        cursor:"move",
        backgroundColor:"lightyellow"
      }}
      {...props}
    >
      📌{content}
    </div>
  );
});

export default Note;
