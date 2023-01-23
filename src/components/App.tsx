import React, { useEffect } from 'react';
import { useAppOpen } from '../hooks/useAppOpen';
import { useSetThemeColors } from '../hooks/useSetThemeColors';
import Popup from './Popup';
import RefactorForm from './RefactorForm';

export default function App() {
  const { isOpen, handleClose } = useAppOpen();
  const setThemeColors = useSetThemeColors();

  useEffect(() => {
    setThemeColors();
  }, [setThemeColors]);

  return (
    <Popup open={isOpen} onOpenChange={handleClose} title="Enter match text">
      <RefactorForm />
    </Popup>
  );
}
