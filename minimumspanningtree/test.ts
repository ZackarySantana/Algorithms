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

// Kruskal’s Algorithm

Deno.test(function kruskal() {
  const solution = lib.kruskal(fullTree);

  for (const edge of solution.edges) {
    lib.assertEquals(minimumSpanningTree.edges.includes(edge), true);
  }

  for (const vertex of solution.vertexes) {
    lib.assertEquals(minimumSpanningTree.vertexes.includes(vertex), true);
  }
});

// Prim’s Algorithm

Deno.test(function prim() {
    const solution = lib.prim(fullTree);
  
    for (const edge of solution.edges) {
      lib.assertEquals(minimumSpanningTree.edges.includes(edge), true);
    }
  
    for (const vertex of solution.vertexes) {
      lib.assertEquals(minimumSpanningTree.vertexes.includes(vertex), true);
    }
  });