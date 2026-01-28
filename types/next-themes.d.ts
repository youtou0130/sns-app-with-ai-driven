declare module "next-themes" {
  import type { ReactNode, JSX } from "react";

  interface ThemeProviderProps {
    children?: ReactNode;
    attribute?: "class" | "data-theme";
    defaultTheme?: string;
    enableSystem?: boolean;
    storageKey?: string;
    themes?: string[];
    forcedTheme?: string;
    enableColorScheme?: boolean;
    disableTransitionOnChange?: boolean;
  }

  export function ThemeProvider(props: ThemeProviderProps): JSX.Element;

  type ResolvedTheme = "light" | "dark" | undefined;

  interface UseThemeResult {
    theme: ResolvedTheme;
    setTheme: (theme: string) => void;
    resolvedTheme: ResolvedTheme;
    themes: string[];
    systemTheme?: "light" | "dark";
  }

  export function useTheme(): UseThemeResult;
}
