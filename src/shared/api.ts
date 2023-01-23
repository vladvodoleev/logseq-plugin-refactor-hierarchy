import { PageEntity } from '@logseq/libs/dist/LSPlugin';

export async function getAllPages(): Promise<Array<PageEntity>> {
  try {
    const pages = (await logseq.Editor.getAllPages()) || [];
    return pages;
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
