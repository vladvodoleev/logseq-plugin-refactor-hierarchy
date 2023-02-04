import { PageEntity } from '@logseq/libs/dist/LSPlugin.user';
import React, { useReducer, createContext, ReactNode, useMemo, useContext } from 'react';
import { PageEntityWithRegexMatch } from './useMatchingPages';

export type AppStep = 1 | 2 | 3;

type GlobalState = {
  step: AppStep;
  match: string;
  replace: string;
  pages: Array<PageEntityWithRegexMatch>;
};

const initialGlobalState: GlobalState = {
  step: 1,
  match: '',
  replace: '',
  pages: [],
};

type GoToStep2Action = {
  type: 'GO_TO_STEP_2';
  match: string;
};

type GoToStep3Action = {
  type: 'GO_TO_STEP_3';
  replace: string;
  pages: Array<PageEntityWithRegexMatch>;
};

// for prev steps can use GO_BACK_TO_STEP_1

type GlobalActions = GoToStep2Action | GoToStep3Action;

function globalReducer(state: GlobalState, action: GlobalActions): GlobalState {
  switch (action.type) {
    case 'GO_TO_STEP_2':
      return {
        ...state,
        match: action.match,
        step: 2,
      };
    case 'GO_TO_STEP_3':
      return {
        ...state,
        replace: action.replace,
        pages: action.pages,
        step: 3,
      };
    default:
      return state;
  }
}

type GoToStep2Function = (match: string) => void;
type GoToStep3Function = (pages: Array<PageEntity>, replace: string) => void;

type GlobalStateContextValue = {
  state: GlobalState;
  handleGoToStep2: GoToStep2Function;
  handleGoToStep3: GoToStep3Function;
};

const GlobalStateContext = createContext<GlobalStateContextValue>({} as GlobalStateContextValue);

function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(globalReducer, initialGlobalState);

  function handleGoToStep2(newMatch: string): void {
    dispatch({ type: 'GO_TO_STEP_2', match: newMatch });
  }

  function handleGoToStep3(newPages: Array<PageEntityWithRegexMatch>, newReplace: string): void {
    dispatch({ type: 'GO_TO_STEP_3', pages: newPages, replace: newReplace });
  }

  const value = useMemo(
    () => ({
      state,
      handleGoToStep2,
      handleGoToStep3,
    }),
    [state]
  ) as GlobalStateContextValue;

  return <GlobalStateContext.Provider value={value}>{children}</GlobalStateContext.Provider>;
}

function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateContext');
  }
  return context;
}

export { GlobalStateProvider, useGlobalState };
