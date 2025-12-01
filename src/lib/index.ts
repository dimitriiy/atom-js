type Computed<T> = (get: <U>(atom: Atom<U>) => U) => T;
type InitState<T> = T | Computed<T>;
type Subscriber<T> = (newValue: T) => void;

export class Atom<T> {
  private value: T;
  private subscribers: Set<Subscriber<T>> = new Set();
  private static idCounter = 0;
  private id: number = 0;
  private dependsOn = new Map<Atom<any>, () => void>();

  private static updateQueue = new Map<Atom<any>, () => void>();
  private static isFlushingUpdates = false;

  constructor(initState: InitState<T>) {
    this.id = Atom.getId();

    if (typeof initState === 'function') {
      this.value = this.computeDerivedValue(initState as Computed<T>);
    } else {
      this.value = initState;
    }
  }

  static getId() {
    return Atom.idCounter++;
  }

  computeDerivedValue(computedFn: Computed<T>) {
    const oldDeps = new Map(this.dependsOn);
    const newDependencies = new Map<Atom<any>, () => void>();

    const get = <T>(atom: Atom<T>) => {
      if (oldDeps.has(atom)) {
        newDependencies.set(atom, oldDeps.get(atom)!);
        oldDeps.delete(atom);
      } else if (!newDependencies.has(atom)) {
        let unsubscribe = atom.subscribe(() => {
          const neValue = computedFn(get);
          if (neValue === this.value) return;

          this.value = neValue;
          this.notify(neValue);
        });

        newDependencies.set(atom, unsubscribe);
      }

      return atom.get();
    };

    oldDeps.forEach((cb) => cb());
    oldDeps.clear();

    this.dependsOn = newDependencies;

    return computedFn(get);
  }

  get(): T {
    return this.value;
  }

  set(value: T): void {
    if (this.value === value) return;
    this.value = value;

    this.notify(value);
  }

  notify(newValue: T) {
    this.subscribers.forEach((cb) => {
      Atom.updateQueue.set(this, () => cb(newValue));
    });

    if (!Atom.isFlushingUpdates) {
      Atom.scheduleFlush();
    }
  }

  static scheduleFlush() {
    queueMicrotask(() => {
      if (Atom.updateQueue.size > 0) {
        Atom.flushUpdates();
      }
    });
  }

  static flushUpdates() {
    if (this.isFlushingUpdates) return;

    Atom.updateQueue.forEach((cb) => cb());

    Atom.updateQueue.clear();
    this.isFlushingUpdates = false;
  }

  subscribe(fn: Subscriber<T>) {
    this.subscribers.add(fn);

    return () => {
      this.subscribers.delete(fn);
    };
  }
}

export const createAtom = <T>(value: InitState<T>) => new Atom(value);
