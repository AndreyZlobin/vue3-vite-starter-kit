export async function multipleRequest(callbacks: any[]): Promise<(() => Promise<void>)[]> {
  return Promise.all(callbacks);
}
