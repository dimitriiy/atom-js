import type { ComputedNode } from './computed';
import { globalContext } from './context';

export type Subscriber<T> = (newValue: T) => void;
export type Disposer = () => void;

export interface NodeBase<T> {
  subscribe(fn: Subscriber<T>): Disposer;
}

export interface AtomModel<T> extends NodeBase<T> {
  value: T;
  set(next: T | ((prev: T) => T)): void;

  dependents: Set<ComputedNode<any>>;
}

export class Atom<T> implements AtomModel<T> {
  subscribers: Set<Subscriber<T>> = new Set();

  dependents: Set<ComputedNode<any>> = new Set();

  _value: T;

  name: string | undefined = undefined;

  constructor(value: T | (() => T), name?: string) {
    this._value = typeof value === 'function' ? value() : value;

    this.name = name;
  }

  get value() {
    if (globalContext.currentComputation) {
      this.dependents.add(globalContext.currentComputation);
    }
    console.log('get 333', this.dependents);

    return this._value;
  }

  private scheduleNotify() {
    queueMicrotask(() => {
      this.subscribers.forEach((fn) => fn(this.value));
    });
  }

  private markDepents() {
    console.log(this.dependents);
    this.dependents.forEach((dep) => dep.markAsDirty());
  }

  set(next: T | ((prev: T) => T)): void {
    const newValue = typeof next === 'function' ? (next as (prev: T) => T)(this.value) : next;

    if (Object.is(this._value, newValue)) return;

    this._value = newValue;

    this.markDepents();
    this.scheduleNotify();
  }

  subscribe(fn: Subscriber<T>): Disposer {
    this.subscribers.add(fn);

    return () => {
      this.subscribers.delete(fn);
    };
  }
}

export function atom<T>(initial: T, name?: string) {
  const atom = new Atom(initial, name);

  function read(this: Atom<T>) {
    return atom.value;
  }

  Object.setPrototypeOf(read, Object.getPrototypeOf(atom));

  Object.assign(read, atom);

  return read as unknown as Atom<T> & (() => T);
}
