import React from 'react';
import { useGetPages } from '../hooks/useGetPages';
import { useMatch } from '../hooks/useMatch';
import { useReplace } from '../hooks/useReplace';
import { renamePage } from '../shared/api';
import Loader from './Loader';
import PageNameText from './PageNameText';

export default function RenameConfirmScreen() {
  const { value: match } = useMatch();
  const { value: replace } = useReplace();
  const { pages } = useGetPages(match);
  const [renamingState, setRenamingState] = React.useState<'start' | 'finish' | null>(null);

  async function batchRename() {
    setRenamingState('start');

    // looks less buggy than Promise.all with almost same level of perfomace
    pages.forEach(async (page) => {
      const { originalName } = page;
      const newName = originalName.replace(new RegExp(match), replace);
      try {
        await renamePage(originalName, newName);
      } catch (e) {
        // eslint-disable-next-line no-param-reassign
        page.isFailed = true;
      }
    });

    setRenamingState('finish');
  }

  if (renamingState === 'start') {
    return <Loader />;
  }

  if (renamingState === 'finish') {
    const renamingSucceed = pages.every((page) => !page.isFailed);
    if (renamingSucceed) {
      return <span>RENAMING SUCCEEDED!</span>;
    }
    const failedPages = pages.filter((page) => page.isFailed);
    return (
      <>
        <span>Renaming failed</span>
        <ul>
          {failedPages.map((page) => (
            <li key={page.originalName}>
              <span className="text-primary-link">${page.originalName}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <ul className="overflow-auto">
        {pages.map((page) => (
          <li key={page.originalName}>
            <PageNameText pageName={page.originalName} match={match} replace={match} />-{'>'}
            <PageNameText pageName={page.originalName} match={match} replace={replace} />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="ml-auto mt-auto block rounded-md bg-primary-link py-2 px-4"
        onClick={batchRename}
      >
        Rename
      </button>
    </>
  );
}
