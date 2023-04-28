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
