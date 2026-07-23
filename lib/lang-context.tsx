"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "az" | "en";

const STORAGE_KEY = "sm-portfolio-lang";

const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: "az",
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("az");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "az" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  const { lang } = useLang();
  return <T,>(az: T, en: T) => (lang === "az" ? az : en);
}
