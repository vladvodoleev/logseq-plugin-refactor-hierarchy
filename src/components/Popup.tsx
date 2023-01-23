import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

type PopupProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onOpenChange: () => void;
};

export default function Popup({ open, title, children, onOpenChange }: PopupProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="backdrop-blur-md" />
        <Dialog.Content className="fixed left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-primary-background p-8">
          <Dialog.Title className="text-2xl text-primary-text">{title}</Dialog.Title>
          <Dialog.Description>{children}</Dialog.Description>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
