import { PageEntity } from '@logseq/libs/dist/LSPlugin';

let allPages: Array<PageEntity> = [];

const {
  renamePage,
  getAllPages: editorGetAllPages,
  getCurrentPage: editorGetCurrentPage,
} = logseq.Editor;

export async function getAllPages(): Promise<Array<PageEntity>> {
  if (allPages.length > 0) return allPages;
  allPages = (await editorGetAllPages()) || [];
  return allPages;
}

export async function getCurrentPageOriginalName(): Promise<PageEntity['name']> {
  const currentPage = await editorGetCurrentPage();
  return currentPage?.originalName || '';
}

export { renamePage };
