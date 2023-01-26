import React from 'react';
// import { useDefaultMatch } from '../hooks/useDefaultMatch';
import Input from './Input';
import { Label } from './Label';
// import Loader from './Loader';

export default function EnterReplaceScreen({ setData }) {
  return (
    <>
      <fieldset className="">
        <Label htmlFor="name" className="flex-col text-primary-text">
          <span className="block text-lg">Replace text</span>
          <Input id="name" autoFocus />
          <p className="mt-2 w-full text-sm">This will replace the matched portion of page name</p>
        </Label>
      </fieldset>
      <button type="button" className="ml-auto mt-auto block rounded-md bg-primary-link py-2 px-4">
        Next
      </button>
    </>
  );
}
