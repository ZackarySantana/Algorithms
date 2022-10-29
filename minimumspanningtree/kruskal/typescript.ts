// Kruskal’s Algorithm

import type { Graph } from "../../lab2.ts";

function kruskal(graph: Graph): Graph {
  // Our forest starts off with every vertex being its own graph
  const forest = [] as Graph[];
  for (const vertex of graph.vertexes) {
    forest.push({ vertexes: [vertex], edges: [] });
  }

  // And we want to sort our edges by their weight (lightest first)
  const edges = [...graph.edges].sort((e1, e2) => e1.weight - e2.weight);

  // We continue looping while we don't have a minimum spanning tree
  // It will be a minimum spanning tree when all vertexes have been combined
  // We also test for edges > 0 to make sure we don't go out of bounds. This won't
  // be used unless the input is bad
  while (forest.length > 1 && edges.length > 0) {
    // Take the smallest weight edge
    const currentEdge = edges.splice(0, 1)[0];

    // Get the from and to tree from the forest corrosponding
    const fromTree = forest.find((g) =>
      g.vertexes.includes(currentEdge.from) &&
      !g.vertexes.includes(currentEdge.to)
    );
    const toTree = forest.find((g) =>
      g.vertexes.includes(currentEdge.to) &&
      !g.vertexes.includes(currentEdge.from)
    );

    // This is more for type-checking because we know there must
    // exist a from and to tree. And that they won't point to eachother
    if (fromTree == undefined || toTree == undefined) continue;

    // Combine the two trees and evict one of them (in this case toTree -> fromTree)
    // And evicting the toTree
    fromTree.edges.push(currentEdge);
    fromTree.edges.push(...toTree.edges);
    fromTree.vertexes.push(...toTree.vertexes);

    forest.splice(forest.indexOf(toTree), 1);
  }

  // Return our final tree (forest should have length of 1)
  return forest[0];
}

export { kruskal };
