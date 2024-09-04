import { TimetableData } from "../../api/timetable";
import { TimeRange, toHMString } from "../../lib/time";

interface TimetableArrayEntry {
  name: string;
  type: number;
}
type TimetableArrayRow = TimetableArrayEntry[];
export type TimetableArray = TimetableArrayRow[];

function timetableEntry(): TimetableArrayEntry {
  return {
    name: "",
    type: 0,
  };
}

function initTimetableArray(time: TimeRange[]) {
  return time.map((entry) => {
    const row = Array(6)
      .fill(null)
      .map(() => timetableEntry());
    row[0].name = `${toHMString(entry.from)} - ${toHMString(entry.to)}`;
    return row;
  });
}

export function buildTimetableArray(timetable: TimetableData) {
  const array: TimetableArray = initTimetableArray(timetable.time);

  for (const [index, row] of timetable.timetable.entries()) {
    row.forEach((entry) => {
      const cell = array[entry.index][index + 1];
      cell.name = entry.name;
      cell.type = entry.type;
    });
  }

  return array;
}
