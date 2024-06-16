import React, { createRef, useEffect, useRef } from "react";
import Note from "./Note";

const Notes = ({ notes = [], setNotes = () => {} }) => {
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id === note.id);
      if (savedNote) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        return { ...note, position };
      }
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, [notes.length]);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  const notesRefs = useRef([]);
  const handleDragStart = (note, e) => {
    const currentRef = notesRefs.current[note?.id]?.current;

    const rect = currentRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const startPos = note.position;

    const handleMouseUP = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUP);

      const finalRect = currentRef.getBoundingClientRect();
      const newPositiion = { x: finalRect.left, y: finalRect.top };

      if (checkForOverLap(note.id)) {

  currentRef.style.left = `${startPos.x}px`;
      currentRef.style.top = `${startPos.y}px`;
      } else {
        updateNotePosition(note.id, newPositiion);
      }
    };
    const updateNotePosition = (id, newposition) => {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, position: newposition } : note
      );
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };
    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      currentRef.style.left = `${newX}px`;
      currentRef.style.top = `${newY}px`;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUP);

    const checkForOverLap=(id)=>{
        const currentNoteRef=notesRefs.current[id].current;
        const currentRect=currentNoteRef.getBoundingClientRect();

        return notes.some((note)=>{
            if(note.id===id)return false;

            const otherNoteRef=notesRefs.current[note.id].current;
            const otherRect=otherNoteRef.getBoundingClientRect();
            const overlap=!(currentRect.right<otherRect.left || currentRect.left>otherRect.right || currentRect.bottom<otherRect.top || currentRect.top> otherRect.bottom)
return overlap;
        })
    }
  };
  return (
    <div>
      {notes.map((note) => {
        return (
          <Note
            key={note?.id}
            ref={
              notesRefs.current[note?.id]
                ? notesRefs.current[note?.id]
                : (notesRefs.current[note?.id] = createRef())
            }
            onMouseDown={(e) => handleDragStart(note, e)}
            initPos={note.position}
            content={note?.text}
          />
        );
      })}
    </div>
  );
};

export default Notes;
