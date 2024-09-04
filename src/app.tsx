import "./app.css";
import { get } from "./api/config";
import { Timetable } from "./components/timetable";
import { useQuery } from "preact-fetching";
import { LessonInfo } from "./components/lesson_info";

export function App() {
  const { isLoading, isError, data: config } = useQuery("config", () => get());

  if (isError) return <></>;
  if (isLoading) return <></>;
  if (config == undefined) return <></>;

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4">
      <Timetable />
      <LessonInfo config={config!} />
    </div>
  );
}
