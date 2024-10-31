"use client";

import { ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import theme from "@/styles/theme";

export default function ThemeClient({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}