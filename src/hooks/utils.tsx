import React from 'react';

type CreateSimpleHookInitialValue<T> =
  | T
  | ((...args: any[]) => T)
  | ((...args: any[]) => Promise<T>);

export function createSimpleHook<T>(initialValue: CreateSimpleHookInitialValue<T>) {
  type ContextValue = {
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
    isLoading?: boolean;
  };

  const Context = React.createContext<ContextValue>({} as ContextValue);

  type ProviderProps = {
    children?: React.ReactNode;
  };

  function Provider(props: ProviderProps) {
    const { children } = props;
    const hookState = useHookState(initialValue);

    const providerValue = React.useMemo(() => hookState, [hookState]) as ContextValue;

    return <Context.Provider value={providerValue}>{children}</Context.Provider>;
  }

  function useValue() {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error('useValue must be used within a Provider');
    }
    return context;
  }

  return { Provider, useValue };
}

function useHookState<T>(initialValue: CreateSimpleHookInitialValue<T>) {
  const isInitialValueAsyncFunction = getIsInitialValueAsyncFunction(initialValue);

  const [value, setValue] = React.useState(isInitialValueAsyncFunction ? null : initialValue);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const setDefaultValue = async () => {
    if (isInitialValueAsyncFunction) {
      const defaultValue = await initialValue?.();
      setValue(defaultValue);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    setDefaultValue();
  }, []);

  return {
    value,
    setValue,
    ...(isInitialValueAsyncFunction ? { isLoading } : {}),
  };
}

function getIsInitialValueAsyncFunction<T>(
  initialValue: CreateSimpleHookInitialValue<T>
): initialValue is (...args: any[]) => Promise<T> {
  return (
    initialValue?.constructor?.name === 'AsyncFunction' ||
    (initialValue && typeof initialValue === 'object' && 'then' in initialValue)
  );
}
