import { useState } from "react";
import NoteContext from "./notesContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "63ff9a0245123be88aab31dc",
      user: "63ff90c362219335b4a929fc",
      title: "Mathematics Assignment to be done",
      description:
        "I have to complete my Mathematics assignment which is due by date 26/01/2023.It needs to be done ASAP",
      tag: "General",
      date: "2023-03-01T18:31:30.989Z",
      __v: 0,
    },
    {
      _id: "640017e6d7121c0f920433a2",
      user: "63ff90c362219335b4a929fc",
      title: "Do complete the research paper",
      description: "The research paper needs to be completed and reviewed ASAP",
      tag: "General",
      date: "2023-03-02T03:28:38.449Z",
      __v: 0,
    },
    {
      user: "63ff90c362219335b4a929fc",
      title: "Bring Grocery",
      description: "Visit supermarket and bring Grocery",
      tag: "General",
      _id: "64001f12b8455da23fee24a8",
      date: "2023-03-02T03:59:14.971Z",
      __v: 0,
    }
  ];
  const [notes, setNotes] = useState(notesInitial);
  // Add  a Note
  const addNote = ( title, description, tag) => {
    // TODO api call
    console.log('Adding a new Note')
    const note = {
      user: "63ff90c362219335b4a929fc",
      title: title,
      description: description,
      tag: tag,
      _id: "64001f12b8455da23fee24a8",
      date: "2023-03-02T03:59:14.971Z",
      __v: 0,
    }
    setNotes(notes.concat(note))
  }
  // Delete a Note
  const deleteNote = () => {
    
  }
  // Update a Note
  const updateNote = () => {
    
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
