import { createSimpleHook } from './utils';

export type Step = 1 | 2 | 3;

const { useValue: useStep, Provider: StepProvider } = createSimpleHook<Step>(1);

export { useStep, StepProvider };
