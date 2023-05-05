import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";

const ChapterBox = ({
  index,
  editingIndex,
  startIndex,
  endIndex,
  field,
  handleEndPageChange,
  handleStartPageChange,
  handleSave,
  handleDelete,
  handleEdit,
  handleChapterNameChange,
}) => {
  return (
    <div key={index} className="m-2 p-2"> 
     {index+1}
      <label htmlFor="" className="p-2">
        Chapter Name :
        <input
          id={`chapter${field.id}`}
          disabled={field.id !== editingIndex}
          type="text"
          name="chapterName"
          value={field.chapterName}
          onChange={(e) => handleChapterNameChange(e, field.id)}
        />
      </label>
      <label htmlFor="" className="p-2">
        Start Page :
        <input
          id={`start${field.id}`}
          style={{ width: "60px" }}
          disabled={field.id !== editingIndex}
          type="number"
          name="startPage"
          // value={field.startPage}
          value={field.id === editingIndex ? startIndex : field.startPage}
          onChange={(e) => handleStartPageChange(e, field.id)}
        />
      </label>
      <label htmlFor="" className="p-2">
        End Page :
        <input
          id={`end${field.id}`}
          disabled={field.id !== editingIndex}
          style={{ width: "60px" }}
          type="number"
          name="endPage"
          // value={field.endPage}
          value={field.id === editingIndex ? endIndex : field.endPage}
          onChange={(e) => handleEndPageChange(e, field.id)}
        />
      </label>
      {editingIndex === index ? (
        <>
          <button
            className="btn btn-primary m-1"
            onClick={(e) =>
              handleSave(
                e,
                field.id,
                field.chapterName,
                field.startPage,
                field.endPage
              )
            }
          >
            <BsCheckLg />
          </button>
          <button
            className="btn btn-primary m-1"
            onClick={(e) => handleDelete(e, field.id)}
            disabled={field.startPage > 30 || field.endPage > 30}
          >
            <AiFillDelete />
          </button>
        </>
      ) : (
        <>
          <button
            className="btn btn-primary m-1"
            onClick={(e) =>
              handleEdit(e, field.startPage, field.endPage, field.id)
            }
          >
            <MdOutlineModeEditOutline />
          </button>
        </>
      )}
    </div>
  );
};

export default ChapterBox;
