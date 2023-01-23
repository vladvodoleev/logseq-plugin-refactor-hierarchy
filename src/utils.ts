import { LSPluginUserEvents } from '@logseq/libs/dist/LSPlugin.user';
import React from 'react';

let isVisible = logseq.isMainUIVisible;

function subscribeLogseqEvent<T extends LSPluginUserEvents>(
  eventName: T,
  handler: (...args: any) => void
) {
  logseq.on(eventName, handler);
  return () => {
    logseq.off(eventName, handler);
  };
}

const subscribeToUIVisible = (onChange: () => void) =>
  subscribeLogseqEvent('ui:visible:changed', ({ visible }) => {
    isVisible = visible;
    onChange();
  });

export const useAppVisible = () =>
  React.useSyncExternalStore(subscribeToUIVisible, () =>
    process.env.NODE_ENV !== 'production' ? true : isVisible
  );
