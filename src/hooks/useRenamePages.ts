import React from 'react';
import { renamePage } from '../shared/api';
import { PageEntityWithRegexMatch } from './useMatchingPages';

class RenameblePage {
  private prevName: string | null = null;

  private isFailed: boolean = false;

  constructor(
    // TODO: get rid of all regexmatches, prob don't need them
    public page: PageEntityWithRegexMatch,
    private match: string,
    private replace: string
  ) {}

  getIsFailed() {
    return this.isFailed;
  }

  rename() {
    const { originalName } = this.page;
    this.prevName = originalName;
    const newName = originalName.replace(new RegExp(this.match), this.replace);
    try {
      renamePage(originalName, newName);
    } catch (e) {
      this.isFailed = true;
    }
    return this;
  }
}

type RenamingState = 'beforeRenaming' | 'startRenaming' | 'finishRenaming';

export function useRenamePages(
  pages: Array<PageEntityWithRegexMatch>,
  match: string,
  replace: string
) {
  const [renameblePages] = React.useState(
    pages.map((page) => new RenameblePage(page, match, replace))
  );
  const [renamingState, setIsRenamingState] = React.useState<RenamingState>('beforeRenaming');

  async function batchRename() {
    setIsRenamingState('startRenaming');
    await Promise.all(renameblePages.map((renameblePage) => renameblePage.rename()));
    setIsRenamingState('finishRenaming');
  }

  return {
    renameblePages,
    batchRename,
    renamingState,
  };
}
