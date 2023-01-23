import React, { useEffect } from 'react';
import { useSetThemeColors } from '../hooks/useSetThemeColors';
import { useAppVisible } from '../utils';
import Popup from './Popup';
import RefactorForm from './RefactorForm';

export default function App() {
  const visible = useAppVisible();
  const onClose = () => window.logseq.hideMainUI();
  const setThemeColors = useSetThemeColors();

  useEffect(() => {
    setThemeColors();
  }, [setThemeColors]);

  return (
    <Popup open={visible} onOpenChange={onClose} title="Enter match text">
      <RefactorForm />
    </Popup>
  );
}
