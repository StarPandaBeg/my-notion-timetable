import { TimeRange } from "../lib/time";

export interface Theme {
  lessonColors: string[];
}

export interface TimetableEntry {
  index: number;
  name: string;
  type: number;
}

export type TimetableRow = TimetableEntry[];
export type Timetable = TimetableRow[];

export interface Timetables {
  even: Timetable;
  odd: Timetable;
}

export interface Config {
  time: TimeRange[];
  timetable: Timetables;
  theme: Theme;
}
