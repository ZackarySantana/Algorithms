import * as lib from "../typescript.ts";

// vertexes : a , b , c , d , e , f
// edges    : ab, bc, ad, cf, ef

const a = { key: "a" } as lib.Vertex;
const b = { key: "b" } as lib.Vertex;
const c = { key: "c" } as lib.Vertex;
const d = { key: "d" } as lib.Vertex;
const e = { key: "e" } as lib.Vertex;
const f = { key: "f" } as lib.Vertex;
const ab = { from: a, to: b, weight: 3 } as lib.Edge;
const bc = { from: b, to: c, weight: 1 } as lib.Edge;
const ad = { from: a, to: d, weight: 3 } as lib.Edge;
const cf = { from: c, to: f, weight: 2 } as lib.Edge;
const ef = { from: e, to: f, weight: 5 } as lib.Edge;
const minimumSpanningTree = {
  vertexes: [a, b, c, d, e, f],
  edges: [ab, bc, ad, cf, ef], // 14
} as lib.Graph;

// Adding two extra vertexes that should be removed for the
// minimum spanning tree

const af = { from: a, to: f, weight: 10 };
const be = { from: b, to: e, weight: 6 };
const fullTree = {
  vertexes: [...minimumSpanningTree.vertexes],
  edges: [...minimumSpanningTree.edges, af, be],
} as lib.Graph;

// Bellman Ford Algorithm

Deno.test(function bellmanford() {
    const { distances, previous } = lib.bellmanford(fullTree, a);
  
    lib.assertEquals(distances["a"], 0);
    lib.assertEquals(distances["b"], 3);
    lib.assertEquals(distances["c"], 4);
    lib.assertEquals(distances["d"], 3);
    lib.assertEquals(distances["e"], 9);
    lib.assertEquals(distances["f"], 6);
  
    lib.assertEquals(previous["a"], "a"); // a (0)
    lib.assertEquals(previous["b"], "a"); // a -> b (3)
    lib.assertEquals(previous["c"], "b"); // a -> b -> c (3 + 1)
    lib.assertEquals(previous["d"], "a"); // a -> d (3)
    lib.assertEquals(previous["e"], "b"); // a -> b -> e (3 + 6)
    lib.assertEquals(previous["f"], "c"); // a -> b -> c -> f (3 + 1 + 2)
  });
  
  // Dijkstra Algorithm
  
  Deno.test(function dijkstra() {
    const { distances, previous } = lib.dijkstra(fullTree, a);
  
    lib.assertEquals(distances["a"], 0);
    lib.assertEquals(distances["b"], 3);
    lib.assertEquals(distances["c"], 4);
    lib.assertEquals(distances["d"], 3);
    lib.assertEquals(distances["e"], 9);
    lib.assertEquals(distances["f"], 6);
  
    lib.assertEquals(previous["a"], "a"); // a (0)
    lib.assertEquals(previous["b"], "a"); // a -> b (3)
    lib.assertEquals(previous["c"], "b"); // a -> b -> c (3 + 1)
    lib.assertEquals(previous["d"], "a"); // a -> d (3)
    lib.assertEquals(previous["e"], "b"); // a -> b -> e (3 + 6)
    lib.assertEquals(previous["f"], "c"); // a -> b -> c -> f (3 + 1 + 2)
  });