export type GridRefs = {
  tableRef: HTMLTableElement;
  tbodyRef: HTMLTableSectionElement;
  cellRef: HTMLTableCellElement[][];
};

export enum Day {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export type Box = {
  col: number;
  row: number;
  element: HTMLElement;
  rect: DOMRect;
};

export type DateRange = {
  start: Date;
  end: Date;
};

export type Highlight = {
  allDay: boolean;
  range: DateRange;
};

export type StoreType = {
  date: Date;
  highlight: Highlight | null;
  height?: number;
  aspectRatio?: number;
  daysPerWeek?: DayPerWeek;
  startWeekOn?: Day;
  showHighlights?: boolean;
};

export type DayPerWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type CellHighlightType = {
  day: Date;
  highlight: boolean;
};
