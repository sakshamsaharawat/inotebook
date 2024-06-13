import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';


const Noteitem = ({ note, updateNote }) => {
    const { deleteNote } = useContext(noteContext);


    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex  justify-content-between'>
                        <h5 className="card-title">{note?.title}</h5>
                        <span> <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note.id) }}></i>
                            <i className="far fa-edit mx-1" onClick={() => updateNote(note)}></i>
                        </span>
                    </div>
                    <p className="card-text">{note?.description}</p>

                </div>
            </div>

        </div>
    )
}

export default Noteitem
