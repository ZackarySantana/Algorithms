// This file imports and re-exports the algorithms and exports some types as well

// Import & Re-export

export * from "../coinchange/brute_force/typescript.ts";
export * from "../coinchange/dynamic_programming/typescript.ts";

export * from "../eggdrop/brute_force/typescript.ts";
export * from "../eggdrop/dynamic_programming/typescript.ts";

export * from "../integerfactorization/brute_force/typescript.ts";
export * from "../integerfactorization/dynamic_programming/typescript.ts";

export * from "../longestcommonsubsequence/brute_force/typescript.ts";
export * from "../longestcommonsubsequence/dynamic_programming/typescript.ts";

export * from "../longestincreasingsubsequence/brute_force/typescript.ts";
export * from "../longestincreasingsubsequence/dynamic_programming/typescript.ts";

export * from "../minimumspanningtree/kruskal/typescript.ts";
export * from "../minimumspanningtree/prim/typescript.ts";

export * from "../shortestpath/bellmanford/typescript.ts";
export * from "../shortestpath/dijkstra/typescript.ts";

export * from "../sort/mergesort/typescript.ts";
export * from "../sort/quicksort/typescript.ts";
export * from "../sort/heapsort/typescript.ts";
export * from "../sort/selectionsort/typescript.ts";

export * from "../binarysearch/typescript.ts";

export * from "../graphtraversal/breadthfirstsearch/typescript.ts";
export * from "../graphtraversal/depthfirstsearch/typescript.ts";

// Types

type Graph = {
  vertexes: Vertex[];
  edges: Edge[];
};

type Vertex = {
  key: string;
};

type Edge = {
  from: Vertex;
  to: Vertex;
  weight: number;
};

// Node for BFS and DFS
type Node<T> = {
  children?: Node<T>[];
  key: T;
};

export type { Edge, Graph, Node, Vertex };

// Writing and reading data

import * as path from "https://deno.land/std@0.102.0/path/mod.ts";

function getDataFileName() {
  return Deno.args.length > 0 ? Deno.args.join(".") : "data.json";
}

export function writeDataFile(o: unknown) {
  const mainModuleDir = path.dirname(path.fromFileUrl(Deno.mainModule));
  Deno.chdir(mainModuleDir);

  Deno.writeTextFileSync(getDataFileName(), JSON.stringify(o));
}

export function readDataFile() {
  const mainModuleDir = path.resolve(
    path.dirname(path.fromFileUrl(Deno.mainModule)),
  );
  Deno.chdir(mainModuleDir);
  return Deno.readTextFileSync(getDataFileName());
}

// Misc

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// Deno

export * from "https://deno.land/std@0.160.0/testing/asserts.ts";
