import { isEvenWeek, isInRange, secondsFromMidnight } from "../../lib/time";
import { Config } from "../../types/config.type";

export function getCurrentTimeRange(config: Config) {
  const seconds = secondsFromMidnight(new Date());
  return config.time.find((val) => isInRange(seconds, val));
}

export function getCurrentTimetableDay(config: Config) {
  const day = new Date().getDay();
  if (day == 0 || day == 6) return undefined;

  const timetable = isEvenWeek() ? config.timetable.even : config.timetable.odd;
  return timetable[day - 1];
}

export function getCurrentTimetableEntry(config: Config) {
  const day = getCurrentTimetableDay(config);
  const time = getCurrentTimeRange(config);
  if (!day || !time) return null;

  const timeIndex = config.time.indexOf(time);
  return day.find((entry) => entry.index == timeIndex);
}
