import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import ImageData from '../Constant/db';
import { setSelectedImagesInState } from '../Redux/photoSlice';



const Images = () => {
    // const selectedImages1 = useSelector(state => state.photos.selectedImages)
    const [selectedImages, setSelectedImages] = useState([]);
    const dispatch = useDispatch();

  
    const handleImageSelect = (event, item) => {
        const selectedIndex = selectedImages.findIndex(img => img.id === item.id);

        if (selectedIndex === -1) {
            // If the image is not already selected, add it to the array
            setSelectedImages([...selectedImages, item]);
        } else {
            // If the image is already selected, remove it from the array
            setSelectedImages(selectedImages.filter(selectedImage => selectedImage.id !== item.id));
        }

        // Check if there are at least two images selected
        if (selectedImages.length >= 2) {
            // Get the indices of the first and last selected images
            const firstIndex = ImageData.findIndex(img => img.id === selectedImages[0].id);
            const lastIndex = ImageData.findIndex(img => img.id === selectedImages[selectedImages.length - 1].id);

            // If the selected image is not the first or last image in the selected images array,
            // select all the images between the first and last images
            console.log(selectedIndex !== 0 && selectedIndex !== selectedImages.length - 1)
            if (selectedIndex !== 0 && selectedIndex !== selectedImages.length - 1) {
               
                const newSelectedImages = ImageData.slice(firstIndex + 1, lastIndex).map(img => {
                    return {
                        ...img,
                        isChecked: true
                    };
                });
                setSelectedImages([...selectedImages.slice(0, selectedIndex), ...newSelectedImages, ...selectedImages.slice(selectedIndex + 1)]);
            }
        }
    };


    useEffect(() => {
        dispatch(setSelectedImagesInState(selectedImages));
    }, [dispatch, selectedImages]);




    return (
        <>
            {ImageData.map((item) => {
                return (
                    <div className="col-6 p-2  ">

                        <div className='p-1 '>
                            <input checked={selectedImages.some(image => image.id === item.id)} id={item.id} type="checkbox" onChange={(event) => handleImageSelect(event, item)} />
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