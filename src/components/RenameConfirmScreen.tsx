import React from 'react';
import { useGlobalState } from '../hooks/useGlobalState';
import PageNameText from './PageNameText';

export default function RenameConfirmScreen() {
  const {
    state: { pages, match, replace },
  } = useGlobalState();
  return (
    <ul>
      {pages.map((page) => (
        <li key={page.originalName}>
          <PageNameText pageName={page.originalName} match={match} replace={match} />-{'>'}
          <PageNameText pageName={page.originalName} match={match} replace={replace} />
        </li>
      ))}
    </ul>
  );
}
