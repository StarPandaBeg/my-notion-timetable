import { TimeRange, toHMString } from "../../lib/time";
import { Config, Timetable } from "../../types/config.type";

interface TimetableArrayEntry {
  name: string;
  color: string;
  type: number;
}

type TimetableArrayRow = TimetableArrayEntry[];

export type TimetableArray = TimetableArrayRow[];

function timetableEntry(): TimetableArrayEntry {
  return {
    name: "",
    type: 0,
    color: "",
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

export function buildTimetableArray(config: Config, timetable: Timetable) {
  const array: TimetableArray = initTimetableArray(config.time);

  for (const [index, row] of timetable.entries()) {
    row.forEach((entry) => {
      const color = config.theme.lessonColors[entry.type];
      const cell = array[entry.index][index + 1];

      cell.name = entry.name;
      cell.type = entry.type;
      cell.color = color;
    });
  }

  return array;
}
