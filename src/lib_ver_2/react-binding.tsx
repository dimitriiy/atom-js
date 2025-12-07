import type { Atom } from '@lib';
import React from 'react';

export function useAtom<T>(atom: Atom<T>) {
  const [value, setValue] = React.useState(atom.get());

  React.useEffect(() => {
    let unsubscribe = atom.subscribe(setValue);

    return () => unsubscribe();
  }, [atom]);

  const onChange = React.useCallback(
    (value: T) => {
      atom.set(value);
    },
    [atom]
  );

  return [value, onChange] as const;
}

export function useAtomValue<T>(atom: Atom<T>) {
  const [value, setValue] = React.useState<T>(atom.get());

  React.useEffect(() => {
    let unsubscribe = atom.subscribe(setValue);

    return () => unsubscribe();
  }, [atom]);

  return value;
}
