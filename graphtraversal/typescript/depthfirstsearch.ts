// Depth First Search

import type { Node } from "../../lab2.ts";

function dfs<T>(head: Node<T>, found: (o: T) => boolean): boolean {
  // Recursive function for DFS
  // DFS is often implemented using a Stack (which is recursion)
  function helper(head: Node<T>) {
    if (head == null) return false;

    // Run the helper on all the children
    for (const child of head.children ?? []) {
      // Stop when one has found it
      if (helper(child)) {
        return true;
      }
    }

    // Test if the current node is found
    return found(head.key);
  }

  return helper(head);
}

export { dfs };
