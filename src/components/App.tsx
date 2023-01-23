import React, { useEffect } from 'react';
import { useAppOpen } from '../hooks/useAppOpen';
import { setThemeColorsToApp } from '../shared/themeColors';
import Popup from './Popup';
import RefactorForm from './RefactorForm';

export default function App() {
  const { isOpen, handleClose } = useAppOpen();

  useEffect(() => setThemeColorsToApp(), []);

  return (
    <Popup open={isOpen} onOpenChange={handleClose} title="Enter match text">
      <RefactorForm />
    </Popup>
  );
}
