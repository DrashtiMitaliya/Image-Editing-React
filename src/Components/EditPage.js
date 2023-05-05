import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedImagesInState } from "../Redux/photoSlice";
import { CheckFieldValidation, getItemsBetweenIds } from "../utils/utility";
import {
  ALL_FIELDS_ARE_EMPTY,
  ALREADY_CHAPTER_EXISTS,
  COVERED_ALL_PAGES,
  FILL_BEFORE_SAVE,
  INVALID_PAGE_NUMBERS,
  OVERLAP_PAGE_RANGE,
} from "../Constant/Messages";
import ChapterBox from "./ChapterBox";

const EditPage = () => {
  let initialState = [

  ];
  const [fields, setFields] = useState(initialState);
  const [editingIndex, setEditingIndex] = useState(0);
  const [currentObj, setCurrentObj] = useState([{}]);
  const [startIndex, setStartIndex] = useState();
  const [endIndex, setEndIndex] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
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

  const handleAddField = (e, id) => {
    if (fields.length > 0) {
      if (!CheckFieldValidation(fields)) {
        toast.error("Fill all Input First");
      } else {
        if (fields.length >= 1) {
          setEditingIndex((prev) => prev + 1);
        }
        const tempObj = {
          chapterName: "",
          startPage: "",
          endPage: "",
          id: fields.length,
        };
        setFields((prev) => [...prev, tempObj]);
      }
    } else {
      const tempObj = {
        chapterName: "",
        startPage: "",
        endPage: "",
        id: fields.length,
      };
      setFields((prev) => [...prev, tempObj]);
      toast.success("chapter added successfully");
    }
  };

  const handleChapterNameChange = (e, id) => {
    const updatedFields = fields.map((field, index) => {
      if (index === id) {
        return { ...field, chapterName: e.target.value };
      } else {
        return field;
      }
    });
    setFields(updatedFields);
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
        setSelectedImagesInState(getItemsBetweenIds(startIndex, endIndex))
      );
    }
  };

  const handleEndPageChange = (e, id) => {
    setEditingIndex(id);
    const end = e.target.value;
    if (end >= 0 && end <= 30) {
      setEndPage(end);
      dispatch(setSelectedImagesInState(getItemsBetweenIds(startPage, end)));
    }
  };

  const handleEdit = (e, startPage, endPage, id) => {
    setEditingIndex(id);
    dispatch(setSelectedImagesInState(getItemsBetweenIds(startPage, endPage)));
  };
  // const handleSave = (e, id, chapterName, startPage, endPage) => {
  //   e.preventDefault();
  //   if (chapterName === null || startPage === null || endPage === null) {
  //     toast.error("Please fill in all the fields");
  //     return;
  //   }
  //   const updatedFields = fields.map((field) => {
  //     if (field.id === id) {
  //       return {
  //         ...field,
  //         chapterName,
  //         startPage,
  //         endPage,
  //       };
  //     }
  //     return field;
  //   });
  //   setFields(updatedFields);
  //   setIsDisabled(false);
  //   setEditingIndex(null);
  //   dispatch(setSelectedImagesInState(getItemsBetweenIds(startPage, endPage)));
  //   toast.success("Chapter saved successfully");
  // };

  const handleSaveClick = (index) => {
    const newfields = [...fields];
    const currentChapter = newfields[index];

    if (
      !currentChapter.chapterName ||
      !currentChapter.startPage ||
      !currentChapter.endPage
    ) {
      toast.error(FILL_BEFORE_SAVE);
      return;
    }

    const existingChapter = newfields.find(
      (chapter, i) =>
        i !== index && chapter.chapterName === currentChapter.chapterName
    );
    if (existingChapter) {
      toast.error(ALREADY_CHAPTER_EXISTS);
      return;
    }

    if (
      currentChapter.startPage <= 0 ||
      currentChapter.endPage <= 0 ||
      currentChapter.startPage > 30 ||
      currentChapter.endPage > 30 ||
      currentChapter.startPage > currentChapter.endPage
    ) {
      toast.error(INVALID_PAGE_NUMBERS);
      return;
    }

    const overlappingChapter = newfields.find(
      (liveChapter, i) =>
        i !== index &&
        liveChapter.startPage <= currentChapter.endPage &&
        liveChapter.endPage >= currentChapter.startPage
    );

    if (overlappingChapter) {
      toast.error(OVERLAP_PAGE_RANGE);
      console.log("overlapping",overlappingChapter);
      return;
    }
    currentChapter.isEnable = false;
    setCurrentObj(newfields);
    dispatch(setSelectedImagesInState(getItemsBetweenIds(null,null)))
  };
  const handleDelete = (e, id) => {
    const newArray = fields.filter((ele) => ele.id !== id);
    setFields([...newArray]);
    dispatch(setSelectedImagesInState(getItemsBetweenIds(startPage, endPage)));
    toast.success("chapter deleted successfully");
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
            handleSave={handleSaveClick}
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
            onClick={(e) => handleAddField(e)}
          >
            Add Chapter 
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditPage;
