export interface StringId {
  id: string;
}
export interface NumberId {
  id: number;
}
export type Id<T> = T extends string ? StringId : NumberId;
