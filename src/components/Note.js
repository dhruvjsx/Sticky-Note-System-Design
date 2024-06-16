import React from "react";

const Note = ({ content,initPos, ...props }) => {
  return (
    <div
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
};

export default Note;
