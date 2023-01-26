import { PageEntity } from '@logseq/libs/dist/LSPlugin.user';
import { useReducer } from 'react';

export type AppStep = 1 | 2 | 3;

type GlobalState = {
  step: AppStep;
  match: string;
  replace: string;
  pages: Array<PageEntity>;
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
  pages: Array<PageEntity>;
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

export function useGlobalState() {
  const [state, dispatch] = useReducer(globalReducer, initialGlobalState);

  function handleGoToStep2(newMatch: string): void {
    dispatch({ type: 'GO_TO_STEP_2', match: newMatch });
  }

  function handleGoToStep3(newPages: Array<PageEntity>, newReplace: string): void {
    dispatch({ type: 'GO_TO_STEP_3', pages: newPages, replace: newReplace });
  }

  return {
    state,
    handleGoToStep2,
    handleGoToStep3,
  };
}
