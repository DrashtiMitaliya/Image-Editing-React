import ImageData from "../Constant/db";

export const MinAndMaxId = (objects) => {
  const { minId, maxId } = objects.reduce(
    (acc, obj) => {
      if (obj.id < acc.minId) {
        acc.minId = obj.id;
      }
      if (obj.id > acc.maxId) {
        acc.maxId = obj.id;
      }
      return acc;
    },
    { minId: Infinity, maxId: -Infinity }
  );
  return { minId, maxId };
};

export function getItemsBetweenIds(minId, maxId) {
  return ImageData.filter((item) => item.id >= minId && item.id <= maxId);
}

export const CheckFieldValidation = (chapters) => {
  let isValid = true;
  chapters.forEach((chapter) => {
    if (
      chapter.chapterName === "" ||
      chapter.startPage === "" ||
      chapter.endPage === ""
    ) {
      isValid = false;
    }
  });
  return isValid;
};


export const GetMinAndMaxId = (arr) => {
  let min = Infinity;
  let max = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    const id = arr[i].id;
    if (id < min) {
      min = id;
    }
    if (id > max) {
      max = id;
    }
  }

  return { min, max };
}