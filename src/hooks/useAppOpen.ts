import { LSPluginUserEvents } from '@logseq/libs/dist/LSPlugin.user';
import React from 'react';

let isVisible = logseq.isMainUIVisible;

const getIsVisible = () => (process.env.NODE_ENV !== 'production' ? true : isVisible);

export function useAppOpen() {
  const isOpen = React.useSyncExternalStore(subscribeToUIVisible, getIsVisible);

  const handleClose = () => window.logseq.hideMainUI();

  return {
    isOpen,
    handleClose,
  };
}

function subscribeToUIVisible(onChange: () => void) {
  return subscribeLogseqEvent('ui:visible:changed', ({ visible }) => {
    isVisible = visible;
    onChange();
  });
}

function subscribeLogseqEvent<T extends LSPluginUserEvents>(
  eventName: T,
  handler: (...args: any) => void
) {
  logseq.on(eventName, handler);
  return () => {
    logseq.off(eventName, handler);
  };
}
