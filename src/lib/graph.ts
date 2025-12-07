// Вычисли in-degree (количество входящих рёбер) для каждой вершины

// Добавь все вершины с in-degree = 0 в очередь

// Пока очередь не пуста:

// Извлеки вершину из очереди

// Добавь её в результат

// Для каждой смежной вершины уменьши её in-degree на 1

// Если in-degree стал 0, добавь эту вершину в очередь

function sortGraph<T>(edges: [T, T][]): T[] | null {
  // Шаг 1: Построение графа и подсчёт входящих рёбер (in-degree)
  const graph = new Map<T, T[]>(); // adjacency list: вершина -> массив соседей
  const inDegree = new Map<T, number>(); // вершина -> количество входящих рёбер
  const allNodes = new Set<T>(); // все уникальные вершины графа

  for (const [from, to] of edges) {
    allNodes.add(from);
    allNodes.add(to);

    if (!graph.has(from)) {
      graph.set(from, []);
    }
    graph.get(from)?.push(to);

    inDegree.set(to, (inDegree.get(to) ?? 0) + 1);

    if (!inDegree.has(from)) {
      inDegree.set(from, 0);
    }
  }

  console.log({ graph, inDegree, allNodes });

  const queue: T[] = [];

  for (const node of allNodes) {
    if (inDegree.get(node) === 0) {
      queue.push(node);
    }
  }

  const result = [];

  while (queue.length > 0) {
    const current = queue.shift();

    result.push(current);

    const neighbors = graph.get(current!)! ?? [];

    for (const neighbor of neighbors) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);

      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }
  return result;
}
const equalArr = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const testA = [
  [1, 2],
  [2, 3],
  [3, 4],
];
console.log('test a', sortGraph(testA), equalArr(sortGraph(testA), [1, 2, 3, 4]));

const testB = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [4, 5],
  [5, 1],
];

console.log('test b', sortGraph(testB), equalArr(sortGraph(testB), [0, 4, 2, 5, 1, 3]));
