import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';


const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='container  my-3'>
                <h3>Add a Note</h3>
                <form className='mx-10'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Description </label>
                        <input type="text" className="form-control" id="Description" name="description" value={note.description} onChange={onChange} minLength={5} required />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag </label>
                        <input type="text" className="form-control" id="tag" name="tag"
                            value={note.tag} onChange={onChange} minLength={5} required />

                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
