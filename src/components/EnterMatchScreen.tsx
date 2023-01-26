import React from 'react';
import { useDefaultMatch } from '../hooks/useDefaultMatch';
import Input from './Input';
import { Label } from './Label';
import Loader from './Loader';

export default function EnterMatchScreen() {
  const { isLoading, match } = useDefaultMatch();

  if (isLoading) return <Loader />;

  return (
    <>
      <fieldset className="">
        <Label htmlFor="name" className="flex-col text-primary-text">
          <span className="block text-lg">Match text</span>
          <Input id="name" defaultValue={match} autoFocus />
          <p className="mt-2 w-full text-sm">
            The matched portion of the file name will be the part that gets modified. The rest will
            remain unchanged. This supports full range of reguilar expression
          </p>
        </Label>
      </fieldset>
      <button type="button" className="ml-auto mt-auto block rounded-md bg-primary-link py-2 px-4">
        Next
      </button>
    </>
  );
}
