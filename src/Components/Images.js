import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import ImageData from '../Constant/db';
import { setSelectedImagesInState } from '../Redux/photoSlice';

const Images = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const dispatch = useDispatch();

    // const handleImageSelect = (event, item) => {
    //     const selectedIndex = selectedImages.findIndex(img => img.id === item.id);
    
    //     if (selectedIndex === -1) {
    //         // If the image is not already selected, add it to the array
    //         setSelectedImages([...selectedImages, item]);
    //     } else {
    //         // If the image is already selected, remove it from the array
    //         setSelectedImages(selectedImages.filter(selectedImage => selectedImage.id !== item.id));
    //     }
    
    //     // Check if there are at least two images selected
    //     if (selectedImages.length >= 2) {
    //         // Get the indices of the first and last selected images
    //         const firstIndex = ImageData.findIndex(img => img.id === selectedImages[0].id);
    //         const lastIndex = ImageData.findIndex(img => img.id === selectedImages[selectedImages.length - 1].id);
    
    //         // If the selected images are not adjacent, select all the images between them
    //         if (Math.abs(firstIndex - lastIndex) > 1) {
    //             const selectedRange = ImageData.slice(Math.min(firstIndex, lastIndex) + 1, Math.max(firstIndex, lastIndex));
    //             const newSelectedImages = selectedRange.map(img => ({ ...img, isChecked: true }));
    //             setSelectedImages([...selectedImages.filter(img => selectedRange.every(selectedImg => selectedImg.id !== img.id)), ...newSelectedImages]);
    //         }
    //     }
    // };
    

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
      
          // If the selected images are not adjacent, select all the images between them
          if (Math.abs(firstIndex - lastIndex) > 1) {
            const selectedRange = ImageData.slice(Math.min(firstIndex, lastIndex) + 1, Math.max(firstIndex, lastIndex));
      
            // Check if there are any images in the selected range that are not yet selected
            const unselectedImages = selectedRange.filter(img => !selectedImages.some(selectedImg => selectedImg.id === img.id));
      
            // If there are unselected images in the range, select them
            if (unselectedImages.length > 0) {
              const newSelectedImages = unselectedImages.map(img => ({ ...img, isChecked: true }));
              setSelectedImages([...selectedImages, ...newSelectedImages]);
            }
          }
        }
      };
      
    console.log(selectedImages)
    useEffect(() => {
        dispatch(setSelectedImagesInState(selectedImages));
    }, [dispatch, selectedImages]);

    return (
        <>
            {ImageData.map((item, i) => {
                return (
                    <div className="col-6 p-2  " key={i}>

                        <div className='p-1 '>

                            <input checked={selectedImages.some(image => image.id === item.id)} id={item.id} type="checkbox" onChange={(event) => handleImageSelect(event, item)} />
                            <label htmlFor={item.id}>

                                <img src={item.thumbnail} alt="" style={{ objectFit: 'contain', height: '10rem', width: '20rem', padding: '2px', border: '1px solid black' }} />
                            </label>
                            <div>{i + 1} </div>
                        </div>

                    </div>
                )

            })}
        </>
    )
}

export default Images