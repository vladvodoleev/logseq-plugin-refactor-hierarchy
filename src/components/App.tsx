import React, { useEffect, useState } from 'react';
import { useAppOpen } from '../hooks/useAppOpen';
import { setThemeColorsToApp } from '../shared/themeColors';
import Popup from './Popup';

type AppStep = 1 | 2 | 3;

const titles: Record<AppStep, string> = {
  1: 'Enter match text',
  2: 'Enter replace text',
  3: 'Confirm following renaming',
};

export default function App() {
  const { isOpen, handleClose } = useAppOpen();
  const [step, setStep] = useState<AppStep>(1);

  useEffect(() => {
    if (isOpen) setThemeColorsToApp();
  }, [isOpen]);

  if (!isOpen) return null;

  return <Popup open={isOpen} onOpenChange={handleClose} title={titles[step]} />;
}
