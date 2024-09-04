import { CSSProperties, HTMLAttributes, useMemo } from "preact/compat";
import { buildTimetableArray, TimetableArray } from "./util";
import { cn } from "../../lib/util";
import {
  getDayFromMonday,
  isInRange,
  secondsFromMidnight,
  weekFromLastSeptember,
} from "../../lib/time";
import { useTimetable } from "../../hooks/use-timetable";
import { useTheme } from "../../hooks/use-theme";

import "./style.css";

interface TimetableRowProps {
  row: TimetableArray[0];
  highlightCell?: number;
  highlightClass?: string;
}

interface TimetableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  cell: TimetableArray[0][0];
  isHeader: boolean;
}

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];

function TimetableRow({
  row,
  highlightCell,
  highlightClass,
}: TimetableRowProps) {
  const getClassName = (index: number) => {
    if (index == highlightCell) return highlightClass ?? "";
    return "";
  };

  return (
    <tr>
      {row.map((cell, index) => (
        <TimetableCell
          cell={cell}
          isHeader={index == 0}
          className={getClassName(index)}
        />
      ))}
    </tr>
  );
}

function TimetableCell({
  cell,
  isHeader,
  className,
  ...props
}: TimetableCellProps) {
  const theme = useTheme();

  const resultClassName = cn("divide-y-2 divide-border", className);
  const style = {
    color:
      theme.lessonColors.length > cell.type
        ? theme.lessonColors[cell.type]
        : null,
  } satisfies CSSProperties;

  if (isHeader)
    return (
      <th class={resultClassName} style={style} {...props}>
        {cell.name}
      </th>
    );
  return (
    <td class={resultClassName} style={style} {...props}>
      {cell.name}
    </td>
  );
}

export function Timetable() {
  const weekIndex = weekFromLastSeptember();
  const timetable = useTimetable(weekIndex);

  const timetableArray = useMemo(
    () => buildTimetableArray(timetable),
    [timetable]
  );

  const date = new Date();
  const dayOfWeek = new Date().getDay();
  const seconds = secondsFromMidnight(new Date());

  return (
    <table className="timetable">
      <thead>
        <tr>
          <th className={"w-40"}></th>
          {days.map((day, index) => (
            <th>
              {day} - {getDayFromMonday(date, index)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timetableArray.map((row, index) => (
          <TimetableRow
            row={row}
            highlightCell={dayOfWeek > 0 ? dayOfWeek : -1}
            highlightClass={
              isInRange(seconds, timetable.time[index])
                ? "bg-white/[0.05]"
                : "bg-white/[0.02]"
            }
          />
        ))}
      </tbody>
    </table>
  );
}
