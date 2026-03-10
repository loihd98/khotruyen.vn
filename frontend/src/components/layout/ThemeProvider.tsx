"use client";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "@/store/slices/uiSlice";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Always force dark theme
    document.documentElement.classList.add("dark");
    dispatch(setTheme("dark"));
  }, [dispatch]);

  return <>{children}</>;
}
