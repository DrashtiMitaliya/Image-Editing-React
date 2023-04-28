import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageData from "../Constant/db";
import { setSelectedImagesInState } from "../Redux/photoSlice";
const Images = () => {
  const temp = useSelector((state) => state.photos.selectedImages);
  const [selectedImages, setSelectedImages] = useState(temp);

  const dispatch = useDispatch();

  const handleImageSelect = (event, item) => {
    const selectedIndex = selectedImages.findIndex((img) => img.id === item.id);
    if (selectedIndex === -1) {
      setSelectedImages([...selectedImages, item]);
    } else {
      setSelectedImages(
        selectedImages.filter((selectedImage) => selectedImage.id !== item.id)
      );
    }
    if (selectedImages.length >= 2) {
      const firstIndex = ImageData.findIndex(
        (img) => img.id === selectedImages[0].id
      );
      const lastIndex = ImageData.findIndex(
        (img) => img.id === selectedImages[selectedImages.length - 1].id
      );

      if (Math.abs(firstIndex - lastIndex) > 1) {
        const selectedRange = ImageData.slice(
          Math.min(firstIndex, lastIndex) + 1,
          Math.max(firstIndex, lastIndex)
        );

        const unselectedImages = selectedRange.filter(
          (img) =>
            !selectedImages.some((selectedImg) => selectedImg.id === img.id)
        );

        if (unselectedImages.length > 0) {
          const newSelectedImages = unselectedImages.map((img) => ({
            ...img,
            isChecked: true,
          }));
          setSelectedImages([...selectedImages, ...newSelectedImages]);
        }
      }
    }
  };
  useEffect(() => {
    setSelectedImages(temp);
  }, [temp]);

  useEffect(() => {
    dispatch(setSelectedImagesInState(selectedImages));
  }, [dispatch, selectedImages]);

  return (
    <>
      {ImageData.map((item, i) => {
        return (
          <div className="col-6 p-2  " key={i}>
            <div className="p-1 ">
              <input
                checked={selectedImages.some((image) => image.id === item.id)}
                id={item.id}
                type="checkbox"
                onChange={(event) => handleImageSelect(event, item)}
              />
              <label htmlFor={item.id}>
                <img
                  src={item.thumbnail}
                  alt=""
                  style={{
                    objectFit: "contain",
                    height: "10rem",
                    width: "20rem",
                    padding: "2px",
                    border: "1px solid black",
                  }}
                />
              </label>
              <div>{i + 1}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Images;
