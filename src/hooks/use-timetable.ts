import { useEffect, useState } from "preact/hooks";
import { useQuery } from "preact-fetching";
import { get, TimetableData } from "../api/timetable";

const defaultData = {
  time: [],
  timetable: [],
} satisfies TimetableData;

export function useTimetable(weekIndex: number) {
  const [timetable, setTimetable] = useState<TimetableData>(defaultData);

  const result = useQuery(`timetable:${weekIndex}`, () => get(weekIndex));
  useEffect(() => {
    if (result.isSuccess) {
      setTimetable(result.data!);
    }
  }, [result]);
  return timetable;
}
