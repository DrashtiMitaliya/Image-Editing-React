import React, { useEffect, useState } from 'react';
import ImageData from '../Constant/db';
import { useSelector } from 'react-redux';



const Edit = () => {
    const [startPage, setStartPage] = useState(0)
    const [endPage, setEndPage] = useState(0)
    const [isEnabled, setIsEnabled] = useState(false)
    const [enabledInput, setEnabledInput] = useState(false)
    const [num, setNum] = useState(0)
    const selectedImages1 = useSelector(state => state.selectedImages)
    console.log(selectedImages1)
    useEffect(() => {
        if (selectedImages1.length > 0) {
            setNum(selectedImages1[0].id)
        }
    }, [selectedImages1])

    // for (let i = 0; i < selectedImages1.length; i++) {
    //     const currentObject = selectedImages1[i];
    //     console.log(currentObject)

    // }
    const setEnableChapter1 = () => {
        setIsEnabled(true)
        setEnabledInput(false)
    }
    const setEnableChapter2 = () => {
        setEnabledInput(true)
        setIsEnabled(false)
    }
    const saveChanges1 = () => {
        setIsEnabled(false)
    }
    const saveChanges2 = () => {
        setEnabledInput(false)
    }
    return (
        <div >

            <h1>Select Chapter</h1>
            <div className='m-auto d-flex flex-column'>

                <div className='p-2 d-flex' >
                    <label>Chapter Name</label>
                    <input type="text" disabled={!isEnabled} />
                    <label className='ms-3' htmlFor="">Start Page   </label>
                    <input style={{ width: '50px' }} value={num} type='number' onChange={e => setStartPage(e.target.value)} disabled={!isEnabled}></input>

                    <label className='ms-3' htmlFor="">End Page   </label>
                    <input style={{ width: '50px' }} type='number' value={selectedImages1.length > 0 ? selectedImages1[selectedImages1.length - 1].id : 0} onChange={e => setEndPage(e.target.value)} disabled={!isEnabled}></input>

                    <button className='btn btn-primary ms-3' onClick={setEnableChapter1} > Edit</button>
                    <button className='btn btn-primary ms-3' onClick={saveChanges1} >Delete </button>
                </div>
                <button className='btn btn-primary w-25 m-auto my-3'> Add Chapter </button>
            

            </div>


        </div>
    )
}

export default Edit