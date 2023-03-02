import React, { useContext } from "react";
import noteContext from "../context/notes/notesContext";
import NoteItem from "./NoteItem";
import AddNote from './AddNote'
import Alert from './Alert'
const Notes = () => {
    const context = useContext(noteContext);
    const { notes, addNote } = context;
  return (
    <>
    <Alert message = "Amazing Siddhant"/>
    <AddNote/>
    <div className="row my-3">
      <h2 style={{"paddingTop": "50px"}}>Your Notes</h2>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note}/>
      })}
    </div>
    </>
  );
};

export default Notes;
