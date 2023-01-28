import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import EnterMatchScreen from './EnterMatchScreen';
import { AppStep, useGlobalState } from '../hooks/useGlobalState';
import EnterReplaceScreen from './EnterReplaceScreen';

type PopupProps = {
  open: boolean;
  onOpenChange: () => void;
};

const titles: Record<AppStep, string> = {
  1: 'Enter match text',
  2: 'Enter replace text',
  3: 'Confirm following renaming',
};

export default function Popup({ open, onOpenChange }: PopupProps) {
  const {
    state: { step },
  } = useGlobalState();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="h-screen w-screen bg-[#000000]/40 backdrop-blur-md" />
        <Dialog.Content className="fixed left-1/2 top-1/2 h-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-md bg-primary-background p-8">
          <div className="flex h-full flex-col">
            <Dialog.Title className="text-2xl text-primary-text">{titles[step]}</Dialog.Title>
            <StepSwitch step={step} />
            <Dialog.Close asChild>
              <button type="button" className="absolute top-0 right-0 p-3 text-primary-link">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function StepSwitch({ step }: { step: AppStep }) {
  switch (step) {
    case 1:
      return <EnterMatchScreen />;
    case 2:
      return <EnterReplaceScreen />;
    default:
      return null;
  }
}
