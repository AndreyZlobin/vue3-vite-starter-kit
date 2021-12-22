/**
 * @param {Array<Promise>} requestsList
 * @return {boolean} loading
 */
async function multiplyRequest(requestsList: Promise<any>[]): Promise<boolean> {
  let loading = true;
  await Promise.all(requestsList);
  loading = false;
  return loading;
}

export { multiplyRequest };
