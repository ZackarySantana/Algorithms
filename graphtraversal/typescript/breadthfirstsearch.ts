import * as a from "../../typescript.ts";

// Breadth First Search

function bfs<T>(head: a.Node<T>, found: (o: T) => boolean): boolean {
  // BFS is implemented by doing a queue and doing first in, first out
  const queue = [head] as a.Node<T>[];

  while (queue.length > 0) {
    // Get the first element in the queue and remove it
    const current = queue.splice(0, 1)[0];

    // Add all the children to the queue
    queue.push(...(current.children ?? []));

    // If we have found it, stop the search
    if (found(current.key)) {
      return true;
    }
  }

  return false;
}

export { bfs };
