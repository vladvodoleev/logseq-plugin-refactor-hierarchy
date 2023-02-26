import { getCurrentPageOriginalName } from '../shared/api';
import { createSimpleHook } from './utils';

const { useValue: useMatch, Provider: MatchProvider } = createSimpleHook<string>(
  getCurrentPageOriginalName
);

export { useMatch, MatchProvider };
