import { PageEntity } from "@logseq/libs/dist/LSPlugin";
import React, { useEffect, useRef, useState } from "react";
import { getAllPages } from "./getAllPages";
import { useAppVisible } from "./utils";

function App() {
  const visible = useAppVisible();

  useEffect(() => {
    const test = async () => {
      const appUserConfig = await logseq.App.getUserConfigs();
      console.log({ appUserConfig });

      // Credits to Yurii Piskun
      // discord.com/channels/725182569297215569/853262815727976458/1005819283743453214

      // Get RGB from any color space
      const getRGBValues = (color: string) => {
        const canvas = document.createElement("canvas");
        canvas.height = 1;
        canvas.width = 1;
        const context = canvas.getContext("2d");
        context!.fillStyle = color;
        context!.fillRect(0, 0, 1, 1);
        const rgbaArray = context!.getImageData(0, 0, 1, 1).data;
        return `${rgbaArray[0]}, ${rgbaArray[1]}, ${rgbaArray[2]}`;
      };
      // Primary colors vars
      const setPrimaryColorsVars = () => {
        const primaryTextcolor = getComputedStyle(top!.document.documentElement)
          .getPropertyValue("--ls-primary-text-color")
          .trim();
        // root.style.setProperty(
        //   "--RGBTextColor",
        //   getRGBValues(primaryTextcolor)
        // );
        const primaryBgcolor = getComputedStyle(top!.document.documentElement)
          .getPropertyValue("--ls-primary-background-color")
          .trim();
        // root.style.setProperty("--RGBBgColor", getRGBValues(primaryBgcolor));
        console.log({ primaryBgcolor, primaryTextcolor });
      };
      setPrimaryColorsVars();
    };

    test();
  }, []);

  if (visible) {
    return (
      <main className="backdrop-filter backdrop-blur-md fixed inset-0 flex items-center justify-center">
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
      <label htmlFor="match">Enter match text</label>
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
