import { isEvenWeek, TimeRange } from "../lib/time";
import { time, timetableEven, timetableOdd } from "./mock/timetable";

export interface TimetableEntry {
  index: number;
  name: string;
  type: number;
}
export type TimetableColumn = TimetableEntry[];
export type Timetable = TimetableColumn[];
export interface TimetableData {
  timetable: TimetableColumn[];
  time: TimeRange[];
}

export async function get(weekNumber: number = 0): Promise<TimetableData> {
  const timetable = isEvenWeek(weekNumber) ? timetableEven : timetableOdd;
  return { timetable, time };
}
