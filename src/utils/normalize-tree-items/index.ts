type ChildData<T> = {
  children: T[];
};
export function normalizeTreeItems<T extends ChildData<T>>(arr: T[]): T[] {
  const result: T[] = [];
  const getAllChild = (it: T[]) => {
    it.forEach((i) => {
      result.push(i);
      if (i?.children?.length) {
        getAllChild(i.children);
      }
    });
  };
  getAllChild(arr);
  return result;
}
