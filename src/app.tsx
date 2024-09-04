import "./app.css";
import { get } from "./api/config";
import { Timetable } from "./components/timetable";
import { useQuery } from "preact-fetching";

export function App() {
  const { isLoading, isError, data: config } = useQuery("config", () => get());

  if (isError) return <></>;
  if (isLoading) return <></>;
  if (config == undefined) return <></>;

  return (
    <>
      <Timetable config={config!} />
    </>
  );
}
