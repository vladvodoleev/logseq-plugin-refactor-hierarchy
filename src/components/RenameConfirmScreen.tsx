import React from 'react';
import { useGlobalState } from '../hooks/useGlobalState';
import { useRenamePages } from '../hooks/useRenamePages';
import Loader from './Loader';
import PageNameText from './PageNameText';

export default function RenameConfirmScreen() {
  const {
    state: { pages, match, replace },
  } = useGlobalState();

  const { renameblePages, batchRename, renamingState } = useRenamePages(pages, match, replace);

  if (renamingState === 'startRenaming') {
    return <Loader />;
  }

  if (renamingState === 'finishRenaming') {
    const renamingSucceed = renameblePages.every((page) => !page.getIsFailed());
    if (renamingSucceed) {
      return <span>RENAMING SUCCEEDED!</span>;
    }
    const failedPages = renameblePages.filter((page) => page.getIsFailed());
    return (
      <>
        <span>Renaming failed</span>
        <ul>
          {failedPages.map(({ page }) => (
            <li key={page.originalName}>
              <span className="text-primary-link">${page.originalName}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }

  // if 'beforeRenaming'
  return (
    <>
      <ul className="overflow-auto">
        {renameblePages.map(({ page }) => (
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
