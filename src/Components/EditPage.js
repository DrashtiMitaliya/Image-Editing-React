import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const EditPage = () => {
    const [fields, setFields] = useState([{ chapterName: '', startPage: '', endPage: '' }])
    const [editingIndex, setEditingIndex] = useState(null)
    const handleAddField = () => {
        const newFields = [...fields, { chapterName: '', startPage: '', endPage: '' }];
        setFields(newFields);
    }
    // console.log(fields)
    const photoSelected= useSelector(state => state.selectedImages)
    console.log(photoSelected)
    
    

    const handleFieldChange = (index, event) => {
        event.preventDefault()
        const newFields = [...fields]
        newFields[index][event.target.name] = event.target.value;

        const startPage = Number(newFields[index].startPage);
        const endPage = Number(newFields[index].endPage);
        if (startPage <= 0 || endPage <= 0 || startPage > endPage) {
            toast.error('Invalid Start or End Page')
        }
        else {
            setFields(newFields)
        }

    }

    const handleEdit = (index) => {
        setEditingIndex(index);
    }

    const handleSave = () => {
        setEditingIndex(null);
    }

    const handleDelete = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    }


    return (
        <div>
            <h2> Select Your Chapter </h2>
            {fields.map((field, index) => (
                <div key={index} className='m-2 p-2'>
                    <label htmlFor="" className='p-2'>
                        Chapter Name :
                        <input
                            type="text"
                            name='chapterName'
                            value={field.chapterName}
                            onChange={(event) => handleFieldChange(index, event)}
                        />
                    </label>
                    <label htmlFor="" className='p-2'>
                        Start Page :
                        <input
                            style={{ width: '50px' }}
                            type="number"
                            name='startPage'
                            // value={num}
                            // value={photoSelected[0].id}
                            onChange={e => handleFieldChange(index, e)}
                        />
                    </label>
                    <label htmlFor="" className='p-2'>
                        End Page :
                        <input
                            style={{ width: '50px' }}
                            type="number"
                            name='endPage'
                            value={field.endPage}
                            onChange={e => handleFieldChange(index, e)}
                        />
                    </label>

                    {editingIndex === index ? (
                        <button className='btn btn-primary m-2' onClick={handleSave}>Save</button>
                    ) : (
                        <>
                            <button className='btn btn-primary m-2' onClick={() => handleEdit(index)}>Edit</button>
                            <button className='btn btn-primary m-2' onClick={() => handleDelete(index)}>Delete</button>
                        </>
                    )}

                </div>

            )
            )}

            <div>
                <button className='btn btn-danger' onClick={handleAddField}>Add Chapter</button>
            </div>
        </div>
    )
}

export default EditPage