import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'


const Notes = (props) => {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { notes, getNotes, addNote, deleteNote, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote.id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
        props.showAlert("Updated successfully", "success")

    };

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();

        // Your logic for handling the click and updating the note can go here.

    };


    return (
        <div className='container'>
            <AddNote addNote={addNote} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="etitle" name="etitle" value={note ? note.etitle : ''} onChange={handleChange} minLength={5} required />
                        </div>
                        <div className="mb-3 modal-body">
                            <label htmlFor="Description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="eDescription" name="edescription" value={note ? note.edescription : ''} onChange={handleChange} minLength={5} required />
                        </div>
                        <div className="mb-3 modal-body">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="etag" name="etag" value={note ? note.etag : ''} onChange={handleChange} minLength={5} required />
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h2>Your Notes</h2>
                {Array.isArray(notes) && notes.length > 0 ? (
                    notes.map((note) => (
                        <Noteitem key={note._id} note={note} deleteNote={deleteNote} updateNote={updateNote} />
                    ))
                ) : (
                    <div className='container'>
                        <p>No notes available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notes;
