import Note from "./components/Note";
import { useState, useEffect } from "react";
import { getAll } from "./utils";

function App(props) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    getAll().then((data) => {
      setNotes(data);
    });
  }
  useEffect(hook, []);

  console.log("render", notes.length, "notes");
  const notesToShow = showAll ? notes : notes.filter(note => note.important);
  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const noteObject = [...notes, { content: newNote, date: new Date().toISOString(), important: Math.random() < 0.5, id: notes.length + 1 }];
    setNotes(noteObject);
    setNewNote("");
  };
  const handleNoteChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  return (
    <div className="">
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {
          notesToShow.map(note => <Note key={note.id} note={note} />)
        }
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default App;
