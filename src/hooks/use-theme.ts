import { useEffect, useState } from "preact/hooks";
import { get, Theme } from "../api/theme";
import { useQuery } from "preact-fetching";

const defaultTheme = {
  lessonColors: ["#ffffff"],
} satisfies Theme;

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const result = useQuery("theme", get);
  useEffect(() => {
    if (result.isSuccess) {
      setTheme(result.data!);
    }
  }, [result]);
  return theme;
}
