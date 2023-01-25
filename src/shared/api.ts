import { PageEntity } from '@logseq/libs/dist/LSPlugin';
import { logError } from './logError';

let allPages: Array<PageEntity>;

export async function getAllPages(): Promise<Array<PageEntity>> {
  if (allPages) return allPages;
  try {
    allPages = (await logseq.Editor.getAllPages()) || [];
    return allPages;
  } catch (e) {
    return [];
  }
}

export async function renamePage(oldName: string, newName: string): Promise<void> {
  try {
    await logseq.Editor.renamePage(oldName, newName);
  } catch (e) {
    throw e as Error;
  }
}

export async function getCurrentPageOriginalName(): Promise<PageEntity['name']> {
  try {
    const currentPage = await logseq.Editor.getCurrentPage();
    return currentPage?.originalName;
  } catch (e) {
    logError(e as Error);
    return '';
  }
}
