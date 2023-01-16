import { PageEntity } from "@logseq/libs/dist/LSPlugin";
import React, { useEffect, useRef, useState } from "react";
import { getAllPages } from "./getAllPages";
import { useSetThemeColors } from "./hooks/use-set-theme-colors";
import { useAppVisible } from "./utils";

function App() {
  const visible = useAppVisible();
  const setThemeColors = useSetThemeColors();

  useEffect(() => {
    setThemeColors();
  }, [setThemeColors]);

  if (visible) {
    return (
      <main className="backdrop-filter backdrop-blur-md fixed inset-0 flex items-center justify-center bg-primary-background">
        <button onClick={() => window.logseq.hideMainUI()}>close</button>
        <RefactorForm />
      </main>
    );
  }
  return null;
}

type pagesState = {
  allPages: Array<PageEntity>;
  matchingPages: Array<PageEntity>;
};

function useGetPages() {
  const [pages, setPages] = useState<Partial<pagesState>>({});

  const getMatchingPages = async (matchString: string) => {
    let allPages;
    if (!pages.allPages) {
      allPages = await getAllPages();
      setPages({ allPages });
    }
    if (!allPages) return;

    const matchRegExp = new RegExp(matchString);
    const matchingPages = allPages.filter((page) => {
      const regExpExecArray = matchRegExp.exec(page.originalName);
      return regExpExecArray ? { ...page, regExpExecArray } : null;
    });
    setPages({ allPages: pages.allPages, matchingPages });
  };

  return { state: pages, getMatchingPages };
}

function RefactorForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { state, getMatchingPages } = useGetPages();

  const onFindMatchClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const matchString = inputRef.current?.value;
    if (!matchString) return;
    getMatchingPages(matchString);
  };

  return (
    <form>
      <label className="text-primary-text" htmlFor="match">
        Enter match text
      </label>
      <input id="match" ref={inputRef} />
      <button onClick={onFindMatchClick}>Find match</button>
      {state.matchingPages && (
        <ul>
          {state.matchingPages.map((page) => (
            <li key={page.originalName}>{page.originalName}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default App;
