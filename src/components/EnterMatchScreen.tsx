import React, { useRef } from 'react';
import { useDefaultMatch } from '../hooks/useDefaultMatch';
import Input from './Input';
import { Label } from './Label';
import Loader from './Loader';

type EnterMatchScreenProps = {
  setMatch: (string) => void;
};

export default function EnterMatchScreen({ setMatch }: EnterMatchScreenProps) {
  const { isLoading, match } = useDefaultMatch();
  const inputRef = useRef<HTMLInputElement>(null);

  if (isLoading) return <Loader />;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMatch(inputRef.current || '');
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col justify-around">
      <fieldset className="">
        <Label htmlFor="name" className="flex-col text-primary-text">
          <span className="block text-lg">Match text</span>
          <Input id="name" defaultValue={match} autoFocus ref={inputRef} />
          <p className="mt-2 w-full text-sm">
            The matched portion of the file name will be the part that gets modified. The rest will
            remain unchanged. This supports full range of reguilar expression
          </p>
        </Label>
      </fieldset>
      <button type="submit" className="ml-auto mt-auto block rounded-md bg-primary-link py-2 px-4">
        Next
      </button>
    </form>
  );
}
