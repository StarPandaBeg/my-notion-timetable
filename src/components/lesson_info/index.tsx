import { CSSProperties } from "preact/compat";
import {
  formatDuration,
  isEvenWeek,
  secondsFromMidnight,
  toHMString,
} from "../../lib/time";
import { Config } from "../../types/config.type";
import { ComponentChild } from "preact";
import { getCurrentTimeRange, getCurrentTimetableEntry } from "./util";

interface WithConfig {
  config: Config;
}

interface InfoRowProps {
  title: ComponentChild;
  value: ComponentChild;
}

export interface LessonInfoProps extends WithConfig {}

function InfoRow({ title, value }: InfoRowProps) {
  return (
    <div className="font-medium text-secondary text-xl">
      <span>{title} </span>
      <span className="font-semibold text-primary">{value}</span>
    </div>
  );
}

function WeekInfo({}: WithConfig) {
  const evenWeek = isEvenWeek();
  return (
    <p className="text-muted">
      Сейчас: {evenWeek ? "нижняя" : "верхняя"} неделя
    </p>
  );
}

function NoLesson() {
  return <InfoRow title={"Идёт:"} value={"Отдых"} />;
}

function CurrentLessonInfo({ config }: WithConfig) {
  const seconds = secondsFromMidnight(new Date());
  const timeRange = getCurrentTimeRange(config);
  const timetableEntry = getCurrentTimetableEntry(config);
  if (!timetableEntry || !timeRange) return <NoLesson />;

  const lessonStyle = {
    color: config.theme.lessonColors[timetableEntry.type],
  } satisfies CSSProperties;

  const leftSeconds = timeRange.to - seconds;
  const leftHumanized = formatDuration(leftSeconds);

  return (
    <>
      <InfoRow
        title={"Идёт:"}
        value={<span style={lessonStyle}>{timetableEntry.name}</span>}
      />
      <InfoRow
        title={"Осталось:"}
        value={
          <span>
            {leftHumanized}{" "}
            <span className="text-muted">({toHMString(timeRange.to)})</span>
          </span>
        }
      />
      <InfoRow
        title={"Преподаватель:"}
        value={"Григорьев Алексей Валерьевич"}
      />
      <InfoRow title={"Ссылка на пару:"} value={"https://mail.ru/...."} />
    </>
  );
}

export function LessonInfo({ config }: LessonInfoProps) {
  return (
    <div className="flex flex-col justify-center ">
      <WeekInfo config={config} />
      <CurrentLessonInfo config={config} />
    </div>
  );
}
