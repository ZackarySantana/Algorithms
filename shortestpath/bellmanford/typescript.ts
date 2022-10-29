// 13. Bellman Ford Algorithm

import type { Graph, Vertex } from "../../typescript.ts";

function bellmanford(graph: Graph, source: Vertex) {
  const verts = graph.vertexes;
  const edges = graph.edges;

  // Our distances and previous collection. Previous is there just for the user and not
  // used in the algorithm
  const distances = {} as { [key: string]: number };
  const previous = {} as { [key: string]: string };

  // Starting off, the distance to every node is infinity
  // And the previous is no node
  for (let i = 0; i < verts.length; ++i) {
    distances[verts[i].key] = Number.MAX_SAFE_INTEGER;
    previous[verts[i].key] = "";
  }

  // The source has a distance of 0 to its self and the "previous" is its self
  distances[source.key] = 0;
  previous[source.key] = source.key;

  // We loop vertexes - 1 because the source vertex is already solved for.
  // We want to go through all edges multiple times to ensure that the distance to
  // a node accounts for other paths achieved
  for (let v = 0; v < verts.length - 1; ++v) {
    for (let i = 0; i < edges.length; ++i) {
      const from = edges[i].from.key;
      const to = edges[i].to.key;

      // If the distance to the from node + the weight of the edge is less than the distance
      // that to is currently holding, replace it.
      if (distances[from] + edges[i].weight < distances[to]) {
        distances[to] = distances[from] + edges[i].weight;
        previous[to] = from;
      }
    }
  }

  return { distances, previous };
}

export { bellmanford };
