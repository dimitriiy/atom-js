import type { ComputedNode } from './computed';

class Context {
  currentComputation: ComputedNode<any> | null = null;
}

export const globalContext = new Context();
