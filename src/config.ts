import { toSeconds } from "./lib/time";
import { Config } from "./types/config.type";

const lesson = (index: number, name: string, type: number) => ({
  index: index - 1,
  name,
  type,
});

export const config: Config = {
  time: [
    { from: toSeconds(8, 0), to: toSeconds(9, 35) },
    { from: toSeconds(9, 55), to: toSeconds(11, 30) },
    { from: toSeconds(11, 50), to: toSeconds(13, 25) },
    { from: toSeconds(13, 45), to: toSeconds(15, 20) },
    { from: toSeconds(15, 30), to: toSeconds(17, 5) },
  ],
  theme: {
    lessonColors: ["#5e87c9", "#c77d48"],
  },
  timetable: {
    odd: [
      [
        lesson(2, "Операционные системы", 0),
        lesson(3, "Этика и эстетика", 0),
        lesson(4, "Архитектура и проектирование ПО", 1),
      ],
      [
        lesson(1, "Программирование мобильных систем", 1),
        lesson(2, "Экономика предприятия", 0),
      ],
      [
        lesson(2, "Организация компьютерных сетей", 0),
        lesson(3, "Анализ требований ПО", 0),
        lesson(4, "Анализ требований ПО", 1),
      ],
      [
        lesson(2, "Организация компьютерных сетей", 1),
        lesson(3, "Организация компьютерных сетей", 0),
        lesson(4, "Операционные системы", 1),
      ],
      [
        lesson(1, "Программирование мобильных систем", 0),
        lesson(2, "Архитектура и проектирование ПО", 0),
      ],
    ],
    even: [
      [
        lesson(1, "Архитектура и проектирование ПО", 0),
        lesson(2, "Операционные системы", 0),
        lesson(3, "Этика и эстетика", 1),
        lesson(4, "Архитектура и проектирование ПО", 1),
      ],
    ],
  },
};
