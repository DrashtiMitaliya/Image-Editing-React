import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const EditPage = () => {
    const initialState = [{ chapterName: "", startPage: "", endPage: "", id: 0 }];
    const [fields, setFields] = useState(initialState);
    const [editingIndex, setEditingIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(null);
    const [endIndex, setEndIndex] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const photoSelected = useSelector((state) => state.photos.selectedImages);

    useEffect(() => {
        if (photoSelected.length > 0) {
            if (photoSelected[photoSelected.length - 1].id < photoSelected[0].id) {
                toast.error("End number can not be greater than starting number");
            }
            setStartIndex(photoSelected.length > 0 && photoSelected[0].id);
            setEndIndex(photoSelected[photoSelected.length - 1].id);
        }
    }, [photoSelected]);

    const handleAddField = (endIndex) => {
        const newFields = [
            ...fields,
            { chapterName: "", startPage: "", endPage: "", id: fields.length },
        ];
        if (endIndex < 30) setFields(newFields);
        toast.success("chapter added successfully");
    };

    const handleFieldChange = (id, event) => {
        if (event.target.value <= 0) {
            event.target.value = null;
        }

        setEditingIndex(id);
        const newFields = [...fields];
        newFields[id] = {
            ...newFields[id],
            [event.target.name]: event.target.value,
        };
        const startPage = Number(newFields[id].startPage);
        const endPage = Number(newFields[id].endPage);
        if (startPage > endPage) {
            toast.error("Invalid Start or End Page");
        } else {
            setFields(newFields);
        }
    };
    // photoSelected[photoSelected.length - 1].id
    const handleEdit = (id) => {
        setEditingIndex(id);
        setIsDisabled(true);
    };

    const handleSave = (id) => {
        setEditingIndex(id);
    };

    const handleDelete = (e, id) => {
        setIsDisabled(true);
        setFields(initialState);
    };
    return (
        <div>
            <h2 className="m-5"> Select Your Chapter </h2>
            {fields.map((field, index) => (
                <div key={index} className="m-2 p-2">
                    <label htmlFor="" className="p-2">
                        Chapter Name :
                        <input
                            disabled={field.id !== editingIndex}
                            type="text"
                            name="chapterName"
                            defaultValue={field.chapterName}
                            onChange={(event) => handleFieldChange(index, event)}
                        />
                    </label>
                    <label htmlFor="" className="p-2">
                        Start Page :
                        <input
                            style={{ width: "50px" }}
                            disabled={field.id !== editingIndex}
                            type="number"
                            name="startPage"
                            defaultValue={startIndex}
                            onChange={(event) => handleFieldChange(index, event)}
                        />
                    </label>
                    <label htmlFor="" className="p-2">
                        End Page :
                        <input
                            disabled={field.id !== editingIndex}
                            style={{ width: "50px" }}
                            type="number"
                            name="endPage"
                            defaultValue={endIndex}
                            onChange={(event) => handleFieldChange(index, event)}
                        />
                    </label>

                    {editingIndex === index ? (
                        <>
                            <button
                                className="btn btn-primary m-2"
                                onClick={() => handleSave()}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-primary m-2"
                                onClick={(e) => handleDelete(e, index)}
                            >
                                Delete
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn btn-primary m-2"
                                onClick={() => handleEdit(field.id)}
                            >
                                Edit
                            </button>
                        </>
                    )}
                </div>
            ))}
            <div>
                {endIndex <= 30 && (
                    <div>
                        <button className='btn btn-danger' onClick={() => handleAddField(endIndex)}>Add Chapter</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditPage;

