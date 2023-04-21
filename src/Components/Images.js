import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ImageData from '../Constant/db';



const Images = () => {
    const selectedImages1 = useSelector(state => state.selectedImages)
    const [selectedImages, setSelectedImages] = useState([]);
    const handleImageSelect = (event, item) => {
        if (event.target.checked) {
            setSelectedImages([...selectedImages, item]);
        } else {
            setSelectedImages(selectedImages.filter(selectedImage => selectedImage.id !== item.id));
        }
    }


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'SET_SELECTED_IMAGES',
            payload: selectedImages
        });
    }, [selectedImages, dispatch,selectedImages1])
//   console.log('selected image ',selectedImages1)

    return (
        <>
            {ImageData.map((item) => {
                return (
                    <div className="col-6 p-2  ">

                        <div className='p-1 '>
                            <input id={item.id} type="checkbox" onChange={(event) => handleImageSelect(event, item)} />
                            <label htmlFor={item.id}>
                                <img src={item.thumbnail} alt="" style={{ objectFit: 'contain', height: '10rem', width: '20rem', padding: '2px', border: '1px solid black' }} />
                            </label>
                        </div>

                    </div>
                )

            })}
        </>
    )
}

export default Images