import { PageEntity } from '@logseq/libs/dist/LSPlugin';

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
