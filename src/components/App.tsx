import React, { useEffect } from 'react';
import { useAppOpen } from '../hooks/useAppOpen';
import { setThemeColorsToApp } from '../shared/themeColors';
import { Providers } from './AppProviders';
import Popup from './Popup';

export default function App() {
  const { isOpen, handleClose } = useAppOpen();

  useEffect(() => {
    if (isOpen) setThemeColorsToApp();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Providers>
      <Popup open={isOpen} onOpenChange={handleClose} />
    </Providers>
  );
}
