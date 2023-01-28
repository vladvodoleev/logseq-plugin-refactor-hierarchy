import React, { useEffect } from 'react';
import { useAppOpen } from '../hooks/useAppOpen';
import { GlobalStateProvider } from '../hooks/useGlobalState';
import { setThemeColorsToApp } from '../shared/themeColors';
import Popup from './Popup';

export default function App() {
  const { isOpen, handleClose } = useAppOpen();

  useEffect(() => {
    if (isOpen) setThemeColorsToApp();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <GlobalStateProvider>
      <Popup open={isOpen} onOpenChange={handleClose} />;
    </GlobalStateProvider>
  );
}
