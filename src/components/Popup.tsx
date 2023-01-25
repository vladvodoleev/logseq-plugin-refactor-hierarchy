import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import EnterMatchScreen from './EnterMatchScreen';

type PopupProps = {
  open: boolean;
  title: string;
  onOpenChange: () => void;
};

export default function Popup({ open, title, onOpenChange }: PopupProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="h-screen w-screen bg-[#000000]/40 backdrop-blur-md" />
        <Dialog.Content className="fixed left-1/2 top-1/2 h-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-md bg-primary-background p-8">
          <div className="flex h-full flex-col justify-around">
            <Dialog.Title className="text-2xl text-primary-text">{title}</Dialog.Title>
            <EnterMatchScreen />
            <button
              type="button"
              className="ml-auto mt-auto block rounded-md bg-primary-link py-2 px-4"
            >
              Next
            </button>
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
