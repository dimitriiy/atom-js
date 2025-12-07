import { atom, Atom, type Disposer, type NodeBase, type Subscriber } from './atom';
import { globalContext } from './context';

export interface ComputedNode<T> extends NodeBase<T> {
  markAsDirty: () => void;

  cached: T | undefined;
}

class Computed<T> implements ComputedNode<T> {
  isDirty: boolean = true;
  cached: T | undefined = undefined;
  subscribers: Set<Subscriber<T>> = new Set();
  name: string | undefined = undefined;

  computedFn: () => T;

  constructor(computedFn: () => T, name?: string) {
    this.computedFn = computedFn;

    this.name = name;
  }

  get value() {
    console.log('get val', globalContext);

    return this.cached;
  }

  markAsDirty() {
    this.isDirty = true;
  }

  recompute() {
    const prev = globalContext.currentComputation;

    globalContext.currentComputation = this;

    const nextValue = this.computedFn();

    if (Object.is(this.cached, nextValue)) return;

    this.cached = nextValue;

    console.log({ nextValue });

    globalContext.currentComputation = prev;
  }

  subscribe(fn: Subscriber<T>): Disposer {
    this.subscribers.add(fn);

    return () => {
      this.subscribers.delete(fn);
    };
  }
}

export const computed = <T extends (...args: unknown[]) => unknown, R = ReturnType<T>>(fn: T) => {
  const atom = new Computed(fn);

  function read(this: ComputedNode<T>) {
    console.log(atom);
    if (atom.isDirty) {
      atom.recompute();
    }

    return atom.value;
  }

  Object.setPrototypeOf(read, Object.getPrototypeOf(atom));

  Object.assign(read, atom);

  return read as unknown as ComputedNode<R> & (() => R);
};
