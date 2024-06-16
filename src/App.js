import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Notes from "./components/Notes";

function App() {
  const [notes, setNotes] = useState([
    { id: 1, text: "Hey there this is default Sticky notes" },
    {
      id: 2,
      text: "You can move it to any place you like",
    },
  ]);

  return <Notes notes={notes} setNotes={setNotes} />;
}

export default App;
