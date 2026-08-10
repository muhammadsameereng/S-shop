import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Contexts from "./Context";
import { load, save, STORAGE_KEYS } from "../lib/utils";

const prefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-color-scheme: dark)").matches;

const States = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [theme, setTheme] = useState(
    () => load(STORAGE_KEYS.theme, null) ?? (prefersDark() ? "dark" : "light")
  );
  const counter = useRef(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    save(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (title, { type = "success", description = "", duration = 3600 } = {}) => {
      const id = ++counter.current;
      setToasts((list) => [...list.slice(-2), { id, title, description, type }]);
      setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const toast = useMemo(
    () => ({
      success: (title, description) => notify(title, { type: "success", description }),
      error: (title, description) => notify(title, { type: "error", description }),
      info: (title, description) => notify(title, { type: "info", description }),
    }),
    [notify]
  );

  const value = useMemo(
    () => ({
      toasts,
      toast,
      notify,
      dismiss,
      theme,
      setTheme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    }),
    [toasts, toast, notify, dismiss, theme]
  );

  return <Contexts.Provider value={value}>{children}</Contexts.Provider>;
};

export default States;
