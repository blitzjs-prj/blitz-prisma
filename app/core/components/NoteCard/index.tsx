import styles from "./NoteCard.module.css"
import Link from "next/link"

export default function NoteCard({ note }) {
  return (
    <Link href={`/notes/${note.id}`}>
      <div className={styles.noteCard}>
        <div className={styles.noteCardFooter}>
          <div className={styles.noteCardName}>
            <h3>{note.name}</h3>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            {note?.content?.slice(0, 100)}...
          </div>
        </div>
      </div>
    </Link>
  )
}
