import { Context, useContext } from 'react';

export function useContextOrThrow<T>(context: Context<T | undefined>): T {
  const theContext = useContext(context);

  if (!theContext) {
    throw new Error(`The hook is not used within the context.`);
  }

  return theContext;
}
