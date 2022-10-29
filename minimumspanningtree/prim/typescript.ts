// Prim’s Algorithm

import type { Graph } from "../../typescript.ts";

function prim(graph: Graph): Graph {
  // This will store our minimum spanning tree
  const min = {
    vertexes: [graph.vertexes[0]],
    edges: [],
  } as Graph;

  // And we want to sort our edges by their weight (lightest first)
  const edges = [...graph.edges].sort((e1, e2) => e1.weight - e2.weight);

  // Continue the loop while there are edges to process
  while (edges.length > 0) {
    // Get the smallest weight edge first, that connects to our graph
    let i;
    let includesFrom;
    let includesTo;
    for (i = 0; i < edges.length; ++i) {
      includesFrom = min.vertexes.includes(edges[i].from);
      includesTo = min.vertexes.includes(edges[i].to);
      if ((includesFrom && !includesTo) || (includesTo && !includesFrom)) {
        break;
      }
    }

    // If the loop reached its end, just break out
    if (i == edges.length) {
      break;
    }

    // This is the smallest edge possible! Let us add it
    const edge = edges.splice(i, 1)[0];
    min.edges.push(edge);

    // If it doesn't include the from, add from
    if (!includesFrom) {
      min.vertexes.push(edge.from);
      continue;
    }

    // If it doesn't include the to, add to
    if (!includesTo) {
      min.vertexes.push(edge.to);
      continue;
    }
  }

  return min;
}

export { prim };
