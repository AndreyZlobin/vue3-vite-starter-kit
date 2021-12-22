export interface GantItem {
  id: string;
  title: string;
  start: number;
  end: number;
  relations: string[];
  delay?: number;
  children: GantItem[];
}

export interface GanttItemWithParams extends GantItem {
  children: GanttItemWithParams[];
  showChild: boolean;
  childList: GantItem[];
  taskLength: number;
  style: any;
}

export interface GantConfig {
  cellWidth: number;
  rowHeight: number;
  taskHeight: number;
  rowTaskPadding: number;
  cellMinWidth: number;
  monthInYear: number;
  months: string[];
}
