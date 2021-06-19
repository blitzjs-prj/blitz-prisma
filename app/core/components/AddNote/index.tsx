import { useRef, useState } from "react"
import createNote from "app/notes/mutations/createNote"
import { useMutation } from "blitz"

export default function AddNote({ closeModal }) {
  const [disable, setDisable] = useState(false)
  const formRef = useRef()
  const [createNoteMutation] = useMutation(createNote)

  async function addNewNote(params) {
    setDisable(true)
    const { addNoteName, addNoteContent } = formRef.current

    const name = addNoteName.value
    const content = addNoteContent.value
    await createNoteMutation({
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
          <h3>Add New Note</h3>
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
                  <input name="addNoteName" type="text" />
                </div>
              </div>
            </div>

            <div className="inputField">
              <div className="label">
                <label>Content</label>
              </div>
              <div>
                <textarea
                  style={{ width: "100%", height: "100px" }}
                  name="addNoteContent"
                  type="text"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button style={{ marginLeft: "0" }} onClick={() => closeModal()}>
            Cancel
          </button>
          <button disabled={disable} className="btn" onClick={() => addNewNote()}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
