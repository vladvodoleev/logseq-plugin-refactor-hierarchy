import { PageEntity } from '@logseq/libs/dist/LSPlugin.user';
import { useCallback, useEffect, useState } from 'react';
import { getAllPages } from '../shared/api';

export function useGetPages(match?: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState<Array<PageEntity>>([]);

  const getMatchingPages = useCallback(async (newMatch?: string) => {
    const newPages = await getPages(newMatch);

    setPages(newPages);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getMatchingPages(match);
  }, [getMatchingPages, match]);

  return { pages, isLoading };
}

async function getPages(match?: string) {
  const allPages = await getAllPages();

  if (!match) return allPages;

  const matchRegExp = new RegExp(match);

  const resultMatchingPages = allPages.reduce((acc, page) => {
    const regexMatch = matchRegExp.exec(page.originalName);
    if (regexMatch) acc.push({ ...page, regexMatch });
    return acc;
  }, [] as Array<PageEntity>);

  return resultMatchingPages;
}
