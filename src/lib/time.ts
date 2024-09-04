export interface TimeRange {
  from: number;
  to: number;
}

function getWeekStartDate(date: Date): Date {
  const dayOfWeek = date.getDay();
  const dayOfWeekMondayBased = (dayOfWeek + 6) % 7;
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - dayOfWeekMondayBased);
  return startDate;
}

function getNextWeekday(date: Date): Date {
  const day = date.getDay();
  if (day >= 1 && day <= 5) return date;

  const daysToAdd = day === 0 ? 1 : 8 - day;
  const nextWeekday = new Date(date);
  nextWeekday.setDate(date.getDate() + daysToAdd);

  return nextWeekday;
}

function weekFromLastSeptember() {
  const date = new Date();
  const startOfThisSeptember = getNextWeekday(
    new Date(date.getFullYear(), 8, 1)
  );
  const startOfPrevSeptember = getNextWeekday(
    new Date(date.getFullYear() - 1, 8, 1)
  );

  const startOfSeptember =
    startOfThisSeptember > date ? startOfPrevSeptember : startOfThisSeptember;

  const startOfWeek = getWeekStartDate(startOfSeptember);
  const startOfCurrentWeek = getWeekStartDate(date);

  const diffInMillis = startOfCurrentWeek.getTime() - startOfWeek.getTime();
  const diffInDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));

  return Math.ceil(diffInDays / 7);
}

export function getDayFromMonday(date: Date, offset: number = 0): string {
  const dayOfWeek = date.getDay();
  const dayOfWeekMondayBased = (dayOfWeek + 6) % 7;
  const targetDate = new Date(date);
  targetDate.setDate(date.getDate() - dayOfWeekMondayBased + offset);

  const day = String(targetDate.getDate()).padStart(2, "0");
  const month = String(targetDate.getMonth() + 1).padStart(2, "0");

  return `${day}.${month}`;
}

export function toSeconds(h: number, m: number = 0) {
  return h * 3600 + m * 60;
}

export function toHMString(seconds: number) {
  return new Date(seconds * 1000).toISOString().substring(11, 16);
}

export function secondsFromMidnight(date: Date = new Date()) {
  var e = new Date(date);
  return (date.getTime() - e.setHours(0, 0, 0, 0)) / 1000;
}

export function isInRange(seconds: number, range: TimeRange) {
  return seconds >= range.from && seconds <= range.to;
}

export function isEvenWeek() {
  const weekNumber = weekFromLastSeptember() + 1;
  return weekNumber % 2 == 0;
}

export function formatDuration(seconds: number) {
  if (seconds < 0) throw Error("Value shouldn't be negative");

  const h = Math.trunc(seconds / 3600);
  const m = Math.trunc(seconds / 60) - h * 60;
  if (h == 0 && m == 0) return "меньше минуты";

  let mSuffix = "";
  if (m % 10 > 1 && m % 10 < 5) mSuffix = "ы";
  if (m % 10 == 1 && m != 11) mSuffix = "а";

  if (h > 0) {
    let suffix = "а";
    if (h % 10 == 1) suffix = "";
    if (h % 10 >= 5) suffix = "ов";

    return `${h} час${suffix} ${m} минут${mSuffix}`;
  }
  return `${m} минут${mSuffix}`;
}
