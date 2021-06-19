import styles from "./Note.module.css"
import { useRouter, useQuery, useParam, useMutation } from "blitz"
import getNote from "app/notes/queries/getNote"
import deleteNote from "app/notes/mutations/deleteNote"
import { useState } from "react"
import EditNote from "app/core/components/EditNote"

export default function Note(props) {
  const [showEditNoteModal, setShowEditNoteModal] = useState(false)
  const router = useRouter()
  const noteId = useParam("noteId", "number")
  const [deleteNoteMutation] = useMutation(deleteNote)
  const [note] = useQuery(getNote, { id: noteId })

  async function deleteNoteFn() {
    if (confirm("Do you want to delete this note?")) {
      await deleteNoteMutation({ id: note?.id })
      router.push("/notes")
    }
  }

  return (
    <div className={styles.noteContainer}>
      <div className={styles.note}>
        <div className={styles.noteDetails}>
          <div className={styles.noteName}>
            <h1>{note?.name}</h1>
          </div>
          <div style={{ padding: "5px 0" }}>
            <span>
              <button
                onClick={() => setShowEditNoteModal(true)}
                style={{ marginLeft: "0" }}
                className="btn"
              >
                Edit
              </button>
              <button onClick={deleteNoteFn} className="btn btn-danger">
                Delete
              </button>
            </span>
          </div>
          <div className={styles.noteDescIngreCnt}>
            <h2>Content</h2>
            <div className={styles.noteSynopsis}>{note?.content}</div>
          </div>
        </div>
      </div>
      {showEditNoteModal ? (
        <EditNote note={note} closeModal={() => setShowEditNoteModal(false)} />
      ) : null}
    </div>
  )
}
