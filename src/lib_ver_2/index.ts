import './context';
import { atom, type Atom } from './atom';
import { computed } from './computed';

const counter = atom(2, 'counter');

console.log(counter());

// counter.subscribe((v) => console.log('subscribe counter', v));

const doubled = computed(() => {
  console.log('Computing doubled...', counter());
  return counter() * 2;
}, 'doubled');

console.log('doubled', doubled());

doubled.subscribe((v) => console.log('doubled changed', v));

counter.set(102);

setTimeout(() => {
  console.log('recompited', doubled());
}, 1000);
// const isEven = computed(() => {
//   console.log('Computing isEven...');
//   return doubled() % 2 === 0;
// });

// // Подписываемся на isEven
// isEven.subscribe((val) => {
//   console.log('isEven changed:', val);
// });

// console.log('=== Initial read ===');
// console.log('doubled:', doubled());
// console.log('isEven:', isEven());

// const isEven = computed(() => {
//   console.log('Computing isEven...');
//   return doubled() % 2 === 0;
// });

// // Подписываемся на isEven
// isEven.subscribe((val) => {
//   console.log('isEven changed:', val);
// });

// console.log('=== Initial read ===');
// console.log('doubled:', doubled());
// console.log('isEven:', isEven());

// function createAtom<T>(init: T, name?: string): Atom<T> {
//   const atom = ((...args: any[]) => {
//     // Логика чтения из контекста (упрощенно)
//     return atom.value;
//   }) as any;

//   Object.assign(atom, {
//     value: init,
//     set: (updater: T | ((prev: T) => T)) => {
//       /* update logic */
//     },
//     dependents: new Set(),
//     name,
//     reatom: { reactive: true },
//   });

//   return atom;
// }

// const atom1 = createAtom(1);
// atom1(); // 1 (функция)
// atom.value; // 1 (свойство)
