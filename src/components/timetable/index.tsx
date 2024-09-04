import { CSSProperties, HTMLAttributes } from "preact/compat";
import { Config, type Timetable } from "../../types/config.type";
import { buildTimetableArray, TimetableArray } from "./util";
import { cn } from "../../lib/util";
import { isEvenWeek, isInRange, secondsFromMidnight } from "../../lib/time";

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

export interface TimetableProps {
  config: Config;
}

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
  const resultClassName = cn("divide-y-2 divide-border", className);
  const style = {
    color: cell.color,
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

export function Timetable({ config }: TimetableProps) {
  const timetable = isEvenWeek() ? config.timetable.even : config.timetable.odd;
  const timetableArray = buildTimetableArray(config, timetable);
  const timeRanges = config.time;

  const dayOfWeek = new Date().getDay();
  const seconds = secondsFromMidnight(new Date(2024, 8, 4, 12));

  return (
    <table className="timetable">
      <thead>
        <tr>
          <th className={"w-40"}></th>
          <th>Понедельник</th>
          <th>Вторник</th>
          <th>Среда</th>
          <th>Четверг</th>
          <th>Пятница</th>
        </tr>
      </thead>
      <tbody>
        {timetableArray.map((row, index) => (
          <TimetableRow
            row={row}
            highlightCell={dayOfWeek > 0 ? dayOfWeek : -1}
            highlightClass={
              isInRange(seconds, timeRanges[index])
                ? "bg-white/[0.05]"
                : "bg-white/[0.02]"
            }
          />
        ))}
      </tbody>
    </table>
  );
}
