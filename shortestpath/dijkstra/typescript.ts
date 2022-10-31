// Dijkstra Algorithm

import type { Graph, Vertex } from "../../utils/utils.ts";

function dijkstra(graph: Graph, source: Vertex) {
  // Originally, all vertexes are unvisited and edges are not used
  let unvisited = [...graph.vertexes];
  let edges = [...graph.edges];

  // Our distances is { "to": distance } where the from is always source
  const distances = {} as { [key: string]: number };
  // Our previous is { "node": "points to" } e.g. b -> a
  const previous = {} as { [key: string]: string };

  // All unvisited nodes have max distance and no previous
  for (const v of unvisited) {
    distances[v.key] = Number.MAX_SAFE_INTEGER;
    previous[v.key] = "";
  }

  // The source is 0 away from its self
  distances[source.key] = 0;
  previous[source.key] = source.key;

  // We start off as the source as our only next node
  let currentNode = source;
  const nextNodes = [source] as Vertex[];

  while (unvisited.length > 0 && nextNodes.length > 0) {
    // We get the next node in our list
    currentNode = nextNodes.splice(0, 1)[0];

    // We get all the connected edges to this node
    const connectedEdges = edges.filter((e) =>
      e.from == currentNode || e.to == currentNode
    );
    // Remove those connected edges from our original edges array
    edges = edges.filter((e) => !connectedEdges.includes(e));

    // We loop through all the edges and test...
    for (const edge of connectedEdges) {
      const currentNodeDistance = distances[currentNode.key];
      const otherNode = edge.from == currentNode ? edge.to : edge.from;
      const weight = edge.weight;

      // Is the distance of the other node (the one connected with currentNode) more or less?
      if (distances[otherNode.key] > currentNodeDistance + weight) {
        // If the currentnode plus the edge weight is less, then replace it for other node
        distances[otherNode.key] = currentNodeDistance + weight;
        previous[otherNode.key] = currentNode.key;
      } else if (distances[otherNode.key] + weight < currentNodeDistance) {
        // If they are more, then replace the currentnode with the other node length + edge weight
        distances[currentNode.key] = distances[otherNode.key] + weight;
        previous[currentNode.key] = otherNode.key;
      }

      // If we haven't visited it AND we don't have it in our queue, add it
      if (unvisited.includes(otherNode) && !nextNodes.includes(otherNode)) {
        nextNodes.push(otherNode);
      }
    }

    // Remove the currentNode from the unvisited
    unvisited = unvisited.filter((v) => v != currentNode);
  }

  return { distances, previous };
}

export { dijkstra };
