import { Config } from "../../types/config.type";
import "./style.css";

export interface TimetableProps {
  config: Config;
}

export function Timetable({ config }: TimetableProps) {
  const time = config.time;

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
        {time.map((entry) => (
          <tr>
            <th>{entry}</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
