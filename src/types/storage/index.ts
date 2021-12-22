import { storageItems } from "~/shared/constants";

export type GetItem = <T>(name: storageItems) => T | null;
export type SetItem = (name: storageItems, value: any) => void;
export type ClearItem = (name: storageItems) => void;

export interface CustomStorage {
  getItem: GetItem;
  setItem: SetItem;
  clearItem: ClearItem;
}
