import styles from "./Notes.module.css"
import NoteCard from "app/core/components/NoteCard"
import { useQuery } from "blitz"
import getNotes from "app/notes/queries/getNotes"
import AddNote from "app/core/components/AddNote"
import { useState } from "react"

const Notes = () => {
  const [notes] = useQuery(getNotes)
  const [showAddNote, setShowAddNote] = useState(false)
  return (
    <div className={styles.notesCnt}>
      <div className={styles.notesBreadcrumb}>
        <div>
          <h2>Your Notes</h2>
        </div>
        <div>
          <button
            className="btn"
            style={{
              paddingLeft: "15px",
              paddingRight: "15px",
              fontWeight: "500",
            }}
            onClick={() => setShowAddNote(true)}
          >
            Add Note
          </button>
        </div>
      </div>
      <div className={styles.notes}>
        {notes?.map((note, i) => (
          <NoteCard note={note} key={i} />
        ))}
      </div>
      {showAddNote ? <AddNote closeModal={() => setShowAddNote(false)} /> : null}
    </div>
  )
}
export default Notes
