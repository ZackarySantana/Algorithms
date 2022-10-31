// Minimum Spanning Tree

import * as a from "../../typescript.ts";

const MinimumSpanningTreeBench = (graph: a.Graph, group: string) => {
  Deno.bench("Kruskal's - " + group, {
    group: "Minimum Spanning Tree " + group,
  }, () => {
    a.kruskal(graph);
  });

  Deno.bench(
    "Prim's - " + group,
    { group: "Minimum Spanning Tree " + group },
    () => {
      a.prim(graph);
    },
  );
};

const createRandomGraph = (
  vertexSize: number,
  edgeSize: number,
  maxWeight: number,
) => {
  const g = { vertexes: [], edges: [] } as a.Graph;

  for (let i = 0; i < vertexSize; ++i) {
    g.vertexes.push({ key: String(i) });
  }

  for (let i = 0; i < edgeSize; ++i) {
    while (true) {
      const edge = {
        from: g.vertexes[Math.floor(g.vertexes.length * Math.random())],
        to: g.vertexes[Math.floor(g.vertexes.length * Math.random())],
        weight: Math.floor(maxWeight * Math.random() + 1),
      };
      const contains1 = g.edges.filter((e) =>
        e.from == edge.from || e.to == edge.from
      );
      const contains2 = contains1.filter((e) =>
        e.from == edge.to || e.to == edge.to
      );

      if (contains2.length == 0) {
        g.edges.push(edge);
        break;
      }
    }
  }

  return g;
};

MinimumSpanningTreeBench(createRandomGraph(10, 15, 5), "10 vertexes, 15 edges");
MinimumSpanningTreeBench(
  createRandomGraph(100, 500, 5),
  "100 vertexes, 500 edges",
);
MinimumSpanningTreeBench(
  createRandomGraph(1000, 50000, 5),
  "1000 vertexes, 50000 edges",
);
