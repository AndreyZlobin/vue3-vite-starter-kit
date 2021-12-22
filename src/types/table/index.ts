export interface TableColumns {
  title: string;
  dataId: string;
  width?: string | number;
  empty?: string | number;
  customSlot?: string;
  sorted?: boolean;
  deep?: string[] | string[][];
  format?: (value: number | string) => string | number;
}
