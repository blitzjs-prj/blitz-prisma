import { useState, useRef } from "react"
import updateNote from "app/notes/mutations/updateNote"
import { useMutation } from "blitz"

export default function EditNote({ closeModal, note }) {
  const formRef = useRef()

  const [disable, setDisable] = useState(false)
  const [updateNoteMutation] = useMutation(updateNote)

  async function editNote() {
    setDisable(true)
    const { editNoteName, editNoteContent } = formRef.current

    const name = editNoteName.value
    const content = editNoteContent.value
    updateNoteMutation({
      id: note?.id,
      name,
      content,
    })
    setDisable(false)
    window.location.reload()
  }

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={() => closeModal()}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Note</h3>
          <span style={{ padding: "10px", cursor: "pointer" }} onClick={() => closeModal()}>
            X
          </span>
        </div>
        <div className="modal-body content">
          <form ref={formRef}>
            <div style={{ display: "flex", margin: "2px 2px 0 0" }}>
              <div style={{ flex: "1 1 100%", margin: "0 0 2px 5px" }} className="inputField">
                <div className="label">
                  <label>Name</label>
                </div>
                <div>
                  <input defaultValue={note?.name} name="editNoteName" type="text" />
                </div>
              </div>
            </div>

            <div className="inputField">
              <div className="label">
                <label>Content</label>
              </div>
              <div>
                <textarea
                  defaultValue={note?.content}
                  style={{ width: "100%", height: "100px" }}
                  name="editNoteContent"
                  type="text"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={() => closeModal()}>Cancel</button>
          <button disabled={disable} className="btn" onClick={() => editNote()}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
