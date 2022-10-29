// This file imports and re-exports the algorithms and exports some types as well

// Import & Re-export

export { coinchange, coinchange2 } from "./coinchange/brute_force/typescript.ts";
export { coinchangeDP } from "./coinchange/dynamic_programming/typescript.ts";

export { eggdrop } from "./eggdrop/brute_force/typescript.ts";
export { eggdropDP } from "./eggdrop/dynamic_programming/typescript.ts";

export { integerfactorization } from "./integerfactorization/brute_force/typescript.ts";
export { integerfactorizationDP } from "./integerfactorization/dynamic_programming/typescript.ts";

export { lcs } from "./longestcommonsubsequence/brute_force/typescript.ts";
export { lcsDP } from "./longestcommonsubsequence/dynamic_programming/typescript.ts";

export { lis } from "./longestincreasingsubsequence/brute_force/typescript.ts";
export { lisDP } from "./longestincreasingsubsequence/dynamic_programming/typescript.ts";

export { kruskal } from "./minimumspanningtree/kruskal/typescript.ts";
export { prim } from "./minimumspanningtree/prim/typescript.ts";

export { bellmanford } from "./shortestpath/bellmanford/typescript.ts";
export { dijkstra } from "./shortestpath/dijkstra/typescript.ts";

export { mergesort } from "./sort/mergesort/typescript.ts";
export { quicksort } from "./sort/quicksort/typescript.ts";
export { heapsort } from "./sort/heapsort/typescript.ts";
export { selectionsort } from "./sort/selectionsort/typescript.ts";

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

// Deno

export { bench } from "https://raw.githubusercontent.com/denoland/deno/v1.27.0/cli/dts/lib.deno.unstable.d.ts";