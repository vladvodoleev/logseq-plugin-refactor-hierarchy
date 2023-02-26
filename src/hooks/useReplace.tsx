import { createSimpleHook } from './utils';

const { useValue: useReplace, Provider: ReplaceProvider } = createSimpleHook<string>('');

export { useReplace, ReplaceProvider };
