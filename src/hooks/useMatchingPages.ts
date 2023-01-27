import { PageEntity } from '@logseq/libs/dist/LSPlugin.user';
import { useCallback, useEffect, useState } from 'react';
import { getAllPages } from '../shared/api';

export type PageEntityWithRegexMatch = PageEntity & { regexMatch: RegExpExecArray };

export function useMatchingPages(match: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [matchingPages, setMatchingPages] = useState<Array<PageEntityWithRegexMatch>>([]);

  const getMatchingPages = useCallback(async (newMatch: string) => {
    const allPages = await getAllPages();

    const matchRegExp = new RegExp(newMatch);
    const resultMatchingPages = allPages.reduce((acc, page) => {
      const regexMatch = matchRegExp.exec(page.originalName);
      if (regexMatch) acc.push({ ...page, regexMatch });
      return acc;
    }, [] as Array<PageEntityWithRegexMatch>);

    setMatchingPages(resultMatchingPages);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getMatchingPages(match);
  }, [getMatchingPages, match]);

  return { matchingPages, isLoading };
}
