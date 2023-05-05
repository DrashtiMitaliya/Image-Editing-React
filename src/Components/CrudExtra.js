import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CheckFieldValidation } from "../utils/utility";
import {
  ALL_FIELDS_ARE_EMPTY,
  ALREADY_CHAPTER_EXISTS,
  COVERED_ALL_PAGES,
  FILL_BEFORE_SAVE,
  INVALID_PAGE_NUMBERS,
  OVERLAP_PAGE_RANGE,
} from "../Constant/Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedImagesInState } from "../Redux/photoSlice";
import { getItemsBetweenIds } from "../utils/utility";

const ChapterList = () => {
  const [fields, setFields] = useState([]);
  const [currentObj, setCurrentObj] = useState([{}]);
  const [chapterName, setChapterName] = useState("");
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");

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
      setStartPage(
        newPhotoselectedArr.length > 0 && newPhotoselectedArr[0].id
      );
      setEndPage(newPhotoselectedArr[newPhotoselectedArr.length - 1].id);
    }
  }, [newPhotoselectedArr, photoSelected.length, photoSelected]);

  const handleAddChapter = () => {
    if (endPage < 30) {
      fields.map((chapter) => {
        if (chapter) {
          chapter.isEnable = false;
        }
        return chapter;
      });
      if (!CheckFieldValidation(fields)) {
        toast.error(ALL_FIELDS_ARE_EMPTY);
      } else {
        const tempObj = {
          chapterName: "",
          startPage: "",
          endPage: "",
          isEnable: true,
          id: fields.length,
        };
        setFields((prev) => [...prev, tempObj]);
      }
    } else {
      toast.error(COVERED_ALL_PAGES);
    }
  };

  const handleChapterNameChange = (index, event) => {
    const newfields = [...fields];
    newfields[index].chapterName = event.target.value;
    setFields(newfields);
    
  };

  const handleStartPageChange = (index, event ,startPage) => {
    const newfields = [...fields];
    newfields[index].startPage = event.target.value;
   
    // setFields(newfields);
    setStartPage(startPage)
    dispatch(setSelectedImagesInState(getItemsBetweenIds(startPage,endPage)))
    console.log("start:end",startPage, endPage)
  };

  const handleEndPageChange = (index, event) => {
    const newfields = [...fields];
    newfields[index].endPage = event.target.value;
    setFields(newfields);
   
   
  };

  const handleEditClick = (index) => {
    const newfields = [...fields];
    const currentChapter = newfields[index];
    newfields.forEach((chapter, i) => {
      if (i === index) {
        chapter.isEnable = true;
      } else {
        chapter.isEnable = false;
      }
    });
    setFields(newfields);
    dispatch(setSelectedImagesInState(getItemsBetweenIds(currentChapter.startPage,currentChapter.endPage)))
  };

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
    // console.log("current ",currentChapter);
    // console.log("all new fields" ,newfields)
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

  const handleDeleteClick = (index) => {
    const newArray = fields.filter((ele) => ele.id !== index);
    setFields([...newArray]);
  };

  return (
    <div>
      {fields.map((chapter, index) => (
        <div key={index} className="m-3 ">
          {chapter.id + 1}
          <input
            className="m-2"
            type="text"
            placeholder="Chapter name"
            value={chapter.chapterName}       
            onChange={(event) => handleChapterNameChange(index, event)}
            disabled={!chapter.isEnable}
          />
          <input
            className="m-2"
            type="number"
            placeholder="Start page"  
            value={photoSelected.length?  photoSelected[0].id :chapter.startPage }  
            onChange={(event) => handleStartPageChange(index, event ,startPage)}
            disabled={!chapter.isEnable}
          />
          <input
            className="m-2"
            type="number"
            placeholder="End page"
            value={photoSelected.length ? photoSelected[photoSelected.length-1].id : chapter.endPage}  
            onChange={(event) => handleEndPageChange(index, event)}
            disabled={!chapter.isEnable}
          />
          {!chapter.isEnable && (
            <button className="m-2" onClick={() => handleEditClick(index)}>
              Edit
            </button>
          )}
          {chapter.isEnable && (
            <div>
              <button className="m-2" onClick={() => handleSaveClick(index)}>
                Save
              </button>
              <button className="m-2" onClick={() => handleDeleteClick(index)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
      <button onClick={handleAddChapter}>Add chapter</button>
    </div>
  );
};

export default ChapterList;
