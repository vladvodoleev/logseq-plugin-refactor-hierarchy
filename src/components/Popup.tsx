import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
// import { Cross2Icon } from "@radix-ui/react-icons";

type popupProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onOpenChange: () => void;
};

export default function Popup({
  open,
  title,
  children,
  onOpenChange,
}: popupProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="backdrop-filter backdrop-blur-md" />
        <Dialog.Content className="bg-primary-background fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md w-1/2 h-1/2 p-8">
          <Dialog.Title className="text-primary-text text-2xl">
            {title}
          </Dialog.Title>
          <Dialog.Description>{children}</Dialog.Description>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
