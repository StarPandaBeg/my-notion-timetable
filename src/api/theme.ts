import { theme } from "./mock/theme";

export interface Theme {
  lessonColors: string[];
}

export async function get(): Promise<Theme> {
  return theme;
}
