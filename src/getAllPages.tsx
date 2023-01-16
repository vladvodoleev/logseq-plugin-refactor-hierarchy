import { PageEntity } from "@logseq/libs/dist/LSPlugin";

export async function getAllPages(): Promise<Array<PageEntity>> {
  try {
    const pages = await logseq.Editor.getAllPages() || [];
    return pages;
  } catch (e) {
    return []
  }
}
