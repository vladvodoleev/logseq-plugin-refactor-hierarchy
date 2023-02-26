import { MatchProvider } from '../hooks/useMatch';
import { ReplaceProvider } from '../hooks/useReplace';
import { StepProvider } from '../hooks/useStep';
import { combineProviders } from './combineProviders';

const providerArray = [StepProvider, MatchProvider, ReplaceProvider];

export const Providers = combineProviders(providerArray);
