export const SET_SELECTED_IMAGES = "SET_SELECTED_IMAGES";

export const setSelectedImages = (selectedImages) => {
  return {
    type: SET_SELECTED_IMAGES,
    payload: selectedImages,
  };
};

// export const chapter = () =>{
//   return {
//     type :CHAPTER ,
//     payload :
//   }
// } 