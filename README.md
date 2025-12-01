# Dummy Atom Library

Эта библиотека предоставляет простое решение для управления состоянием с помощью атомов и вычисляемых значений, а также привязки к React.

## Основные концепции

### Атомы (Atoms)

Атомы - это базовые единицы состояния. Они хранят значение, которое можно читать и записывать.

```ts
const countAtom = createAtom(0);
```

### Вычисляемые значения (Computed Values)

Вычисляемые значения зависят от других атомов и автоматически обновляются при изменении их зависимостей.

```ts
const doubleCount = createAtom((get) => get(countAtom) * 2);
```

## Справочник API

### `createAtom<T>(value: InitState<T>): Atom<T>`

Создает новый атом с заданным начальным значением.

### `Atom<T>.get(): T`

Возвращает текущее значение атома.

### `Atom<T>.set(value: T): void`

Устанавливает значение атома и уведомляет всех подписчиков.

### `Atom<T>.subscribe(fn: (newValue: T) => void): () => void`

Подписывается на изменения атома. Возвращает функцию отмены подписки.

### `useAtom<T>(atom: Atom<T>): [T, (value: T) => void]`

Хук React, который возвращает значение атома и функцию установки значения.

### `useAtomValue<T>(atom: Atom<T>): T`

Хук React, который возвращает только значение атома.

## Примеры использования

### Базовый атом

```ts
const countAtom = createAtom(0);

console.log(countAtom.get()); // 0
countAtom.set(5);
console.log(countAtom.get()); // 5
```

### Вычисляемое значение

```ts
const countAtom = createAtom(0);
const doubleCount = createAtom((get) => get(countAtom) * 2);

console.log(doubleCount.get()); // 0
countAtom.set(3);
console.log(doubleCount.get()); // 6
```

### Интеграция с React

```tsx
function Counter() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
