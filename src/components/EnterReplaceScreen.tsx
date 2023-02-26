import React, { useRef } from 'react';
import { useGetPages } from '../hooks/useGetPages';
import Input from './Input';
import { Label } from './Label';
import Loader from './Loader';
import PageNameText from './PageNameText';
import { useMatch } from '../hooks/useMatch';
import { useReplace } from '../hooks/useReplace';
import { useStep } from '../hooks/useStep';

export default function EnterReplaceScreen() {
  const { value: match } = useMatch();
  const { setValue: setReplace } = useReplace();
  const { setValue: setStep } = useStep();
  const { isLoading, pages } = useGetPages(match);
  const inputRef = useRef<HTMLInputElement>(null);

  if (isLoading) return <Loader />;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const replaceString = inputRef.current!.value;
    if (!replaceString) return;
    setReplace(replaceString);
    setStep(3);
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col justify-around">
      <fieldset className="">
        <Label htmlFor="name" className="flex-col text-primary-text">
          <span className="block text-lg">Replace text</span>
          <Input id="name" autoFocus ref={inputRef} />
          <p className="mt-2 w-full text-sm">This will replace the matched portion of page name</p>
          <ul>
            {pages.map((page) => (
              <li key={page.originalName}>
                <PageNameText pageName={page.originalName} match={match} replace={match} />
              </li>
            ))}
          </ul>
        </Label>
      </fieldset>
      <button type="submit" className="ml-auto mt-auto block rounded-md bg-primary-link py-2 px-4">
        Next
      </button>
    </form>
  );
}
