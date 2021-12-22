/**
 * Replace target item in array.
 * @param {Array} list
 * @param {Object} newListItem
 * @param {String} id
 * @return {Array}
 */
export function listItemReplacerById<T extends { id?: string }>(
  list: T[],
  newListItem: T,
  id: string | number,
): T[] {
  if (!list || !newListItem || !id) return list;
  const index = list.findIndex((item) => item?.id === id);
  return index >= 0
    ? [...list.slice(0, index), newListItem, ...list.slice(index + 1, list.length)]
    : list;
}
