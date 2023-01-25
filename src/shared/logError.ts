import { logseq as PL } from '../../package.json';

export function logError(e: Error) {
  // eslint-disable-next-line no-console
  console.log(`${PL.id}: ${e.message}`);
}
