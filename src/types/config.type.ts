import { TimeRange } from "../lib/time";

export interface Theme {
  lessonColors: string[];
}

export interface TimetableEntry {
  index: number;
  name: string;
  type: number;
}

export type TimetableColumn = TimetableEntry[];
export type Timetable = TimetableColumn[];

export interface Timetables {
  even: Timetable;
  odd: Timetable;
}

export interface Config {
  time: TimeRange[];
  timetable: Timetables;
  theme: Theme;
}
