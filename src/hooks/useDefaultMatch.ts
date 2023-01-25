import { useEffect, useState } from 'react';
import { getCurrentPageOriginalName } from '../shared/api';

export function useDefaultMatch() {
  const [match, setMatch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setDefaultMatch = async () => {
    const originalName = await getCurrentPageOriginalName();
    setMatch(originalName);
    setIsLoading(false);
  };

  useEffect(() => {
    setDefaultMatch();
  }, []);

  return {
    match,
    isLoading,
  };
}
