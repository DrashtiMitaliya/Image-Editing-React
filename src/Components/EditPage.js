import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedImagesInState } from "../Redux/photoSlice";
import { getItemsBetweenIds } from "../utils/utility";
import ChapterBox from "./ChapterBox";

const EditPage = () => {
  let initialState = [
    { chapterName: "KGF chapter 1 ", startPage: "1", endPage: "6", id: 0 },
 
  ];
  const [fields, setFields] = useState(initialState);
  const [editingIndex, setEditingIndex] = useState();
  const [startIndex, setStartIndex] = useState(null); 
  const [endIndex, setEndIndex] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [chapterName, setChapterName] = useState("");
  const [startPage, setStartPage] = useState();
  const [endPage, setEndPage] = useState();

  const dispatch = useDispatch();

  let photoSelected = useSelector((state) => state.photos.selectedImages);
  const newPhotoselectedArr = [...photoSelected].sort((a, b) => a.id - b.id);

  useEffect(() => {
    if (newPhotoselectedArr.length > 0) {
      if (
        newPhotoselectedArr[photoSelected.length - 1].id <
        newPhotoselectedArr[0].id
      ) {
        toast.error("End number can not be greater than starting number");
      }
      setStartIndex(
        newPhotoselectedArr.length > 0 && newPhotoselectedArr[0].id
      );
      setEndIndex(newPhotoselectedArr[newPhotoselectedArr.length - 1].id);
    }
  }, [newPhotoselectedArr, photoSelected.length, photoSelected]);

  const handleAddField = (endIndex) => {
    const tempObj = {
      chapterName: "",
      startPage: "",
      endPage: "",
      id: fields.length,
    };
    if (endIndex < 30) {
      setFields((prev) => [...prev, tempObj]);
      toast.success("chapter added successfully");
      dispatch(setSelectedImagesInState([]));
    } else {
    }
  };

  const handleChapterNameChange = (e, id) => {
    setEditingIndex(id);
    setChapterName(e.target.value);
  };

  const temp = useSelector((state) => state.photos.selectedImages);
  const [selectedImages, setSelectedImages] = useState(temp);

  const handleStartPageChange = (e, id, item) => {
    setEditingIndex(id);
    let selectedIndex = selectedImages.findIndex((img) => img.id === item.id);
    selectedIndex = e.target.value;

    if (selectedIndex >= 0 && selectedIndex <= 30) {
      setStartPage(selectedIndex);
      dispatch(
        setSelectedImagesInState(getItemsBetweenIds(selectedIndex, endIndex))
      );
    }
  };

  const handleEndPageChange = (e, id) => {
    setEditingIndex(id);
    const end = e.target.value;
    if (end >= 0 && end <= 30) {
      setEndPage(end);
      dispatch(setSelectedImagesInState(getItemsBetweenIds(startIndex, end)));
    }
  };

  const handleEdit = (e, startPage, endPage, id) => {
    setEditingIndex(id);
    setIsDisabled(true);
    dispatch(setSelectedImagesInState(getItemsBetweenIds(startPage, endPage)));
  };

  const handleSave = (e, chapterName, startPage, endPage, id) => {
    if (endPage === 0 || startPage === 0) {
      toast.error(" please fill the data ");
    } else {
      setEditingIndex(id);
      setIsDisabled(true);
    }
  };

  const handleDelete = (e, id) => {
    console.log(id);
    const newArray = fields.filter((ele) => ele.id !== id);
    const updateFields = fields.filter((field) => field.id !== id);
    setFields([...newArray]);
    console.log(newArray);
    console.log(fields);
  };

  return (
    <div>
      <h2 className="m-5"> Select Your Chapter </h2>

      {fields &&
        fields.map((field, index) => (
          <ChapterBox
            handleChapterNameChange={handleChapterNameChange}
            handleStartPageChange={handleStartPageChange}
            handleEndPageChange={handleEndPageChange}
            handleSave={handleSave}
            editingIndex={editingIndex}
            index={index}
            field={{ ...field }}
            startIndex={startIndex}
            endIndex={endIndex}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      <div>
        <div>
          <button
            disabled={
              fields.filter((item) => item.endPage > 30 || item.startPage > 30)
                .length
            }
            className="btn btn-danger"
            onClick={() => handleAddField(endIndex)}
          >
            Add Chapter
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditPage;
