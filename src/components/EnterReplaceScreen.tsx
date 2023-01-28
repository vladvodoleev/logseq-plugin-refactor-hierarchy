import React, { useRef } from 'react';
import { useGlobalState } from '../hooks/useGlobalState';
import { useMatchingPages } from '../hooks/useMatchingPages';
import Input from './Input';
import { Label } from './Label';
import Loader from './Loader';

export default function EnterReplaceScreen() {
  const {
    handleGoToStep3,
    state: { match },
  } = useGlobalState();
  const { isLoading, matchingPages } = useMatchingPages(match);
  const inputRef = useRef<HTMLInputElement>(null);

  if (isLoading) return <Loader />;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const replaceString = inputRef.current!.value;
    if (!replaceString) return;
    handleGoToStep3(matchingPages, replaceString);
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col justify-around">
      <fieldset className="">
        <Label htmlFor="name" className="flex-col text-primary-text">
          <span className="block text-lg">Replace text</span>
          <Input id="name" autoFocus />
          <p className="mt-2 w-full text-sm">This will replace the matched portion of page name</p>
          <ul>
            {matchingPages.map((page) => (
              <li
                key={page.originalName}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: page.originalName.replace(
                    match,
                    `<span class='text-primary-link'>${match}</span>`
                  ),
                }}
              />
            ))}
          </ul>
        </Label>
      </fieldset>
      <button type="button" className="ml-auto mt-auto block rounded-md bg-primary-link py-2 px-4">
        Next
      </button>
    </form>
  );
}
