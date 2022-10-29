// 1. Quicksort

// The compare function compares o1 and o2 and returns:
// -#: o2 goes before o1
//  0: o2 and o1 go at the same level (can be swapped)
// +#: o2 goes after o1
// So (o1, o2) => o1 - o2 would sort o1's after o2's (or ascending order)
// And (o1, o2) => o2 - o1 would sort o1's before o2's (or descending order)

// Quicksort picks a pivot, then places that pivot in the right spot.
// Recursively continuing
function quicksort<T>(a: T[], compare: (o1: T, o2: T) => number): T[] {
  const arr = [...a]; // Copy the array so it doesn't mutate the original

  // Helper centers the pivot (at the end) and then positions
  // that pivot in the correct spot in the array (such that
  // all to the left should be before and to the right
  // should be to after)
  const helper = (low: number, high: number) => {
    const pivot = arr[high];

    let i = low; // Start at the lowest index

    // Loop from high to low
    for (let j = low; j < high; ++j) {
      // Compare the current element and pivot (check method comments)
      // above to see how this comparison works

      // If arr[j] < pivot (before) then it would return a -#
      // Then we know arr[j] should be on the left side of the pivot
      if (compare(arr[j], pivot) < 0) {
        // Swap i and j and increment i
        [arr[i], arr[j]] = [arr[j], arr[i]];
        ++i;
      }
    }

    // After the loop, arr[i] should be pointing to the highest number that
    // is still less than the pivot
    // SO we should swap arr[i] and the pivot (the pivot is the highest arr[high])
    [arr[i], arr[high]] = [arr[high], arr[i]];

    // Return that pivot location
    return i;
  };

  const quicksort = (low: number, high: number) => {
    if (low >= high) return; // No more sorting when bounds don't make sense

    // Get the pivot location of arr[high] after putting it in the right spot
    const pivotLocation = helper(low, high);

    // Sort all numbers below the pivot
    quicksort(low, pivotLocation - 1);

    // Sort all numbers after the pivot
    quicksort(pivotLocation + 1, high);
  };

  // Sort the whole array
  quicksort(0, arr.length - 1);

  return arr;
}

function quicksortAsc(arr: number[]): number[] {
  return quicksort(arr, (a, b) => a - b);
}

function quicksortDesc(arr: number[]): number[] {
  return quicksort(arr, (a, b) => b - a);
}

export { quicksort, quicksortAsc, quicksortDesc };

// 2. Mergesort

// The compare function compares o1 and o2 and returns:
// -#: o2 goes before o1
//  0: o2 and o1 go at the same level (can be swapped)
// +#: o2 goes after o1
// So (o1, o2) => o1 - o2 would sort o1's after o2's (or ascending order)
// And (o1, o2) => o2 - o1 would sort o1's before o2's (or descending order)

// Mergesort recursively calls smaller subarrays and sorts them.
// Then combines two sorted arrays (linear iteration between the two sorted)
// combining them such that the resultant is sorted too
function mergesort<T>(a: T[], compare: (o1: T, o2: T) => number): T[] {
  const arr = [...a]; // Copy the array so it doesn't mutate the original

  // Merge
  const merge = (left: number, middle: number, right: number) => {
    // Array.slice(start, end) EXCLUDES the 'end'. So we must add 1
    // Get sub array from [left, middle] (inclusive)
    const leftArr = arr.slice(left, middle + 1);

    // Get sub array from [middle + 1, right] (inclusive)
    const rightArr = arr.slice(middle + 1, right + 1);

    // Keep track of where we are in the left and right array.
    // And start the sorting where left is
    let leftIndex = 0,
      rightIndex = 0,
      mainIndex = left;

    // Continue looping while the indexes are still in bounds
    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      // Compare the left and right elements
      // Such that if it returns a -#, then leftArr is before
      // And a +# then rightArr is before
      if (compare(leftArr[leftIndex], rightArr[rightIndex]) < 0) {
        arr[mainIndex] = leftArr[leftIndex++];
      } else {
        arr[mainIndex] = rightArr[rightIndex++];
      }
      // We always use the mainIndex, so increment it
      ++mainIndex;
    }

    // Put the remaining left and right arrays in to the array
    // Only one of these will run, since the other will have reached the
    // max length
    for (; leftIndex < leftArr.length; ++leftIndex) {
      arr[mainIndex++] = leftArr[leftIndex];
    }

    for (; rightIndex < rightArr.length; ++rightIndex) {
      arr[mainIndex++] = rightArr[rightIndex];
    }
  };

  // Mergesort is our main function that sorts [left, middle] to [middle + 1, right]
  // And then merges those two sorted arrays to one
  const mergesort = (left: number, right: number) => {
    if (left >= right) return;

    // Get the middle for this left and right
    const middle = Math.floor((right - left) / 2 + left);

    // Sort the left and right sides
    mergesort(left, middle);
    mergesort(middle + 1, right);

    // Merge those two sorted arrays
    merge(left, middle, right);
  };

  // Sort the whole array
  mergesort(0, arr.length - 1);

  return arr;
}

function mergesortAsc(arr: number[]): number[] {
  return mergesort(arr, (a, b) => a - b);
}

function mergesortDesc(arr: number[]): number[] {
  return mergesort(arr, (a, b) => b - a);
}

export { mergesort, mergesortAsc, mergesortDesc };

// 3. Egg Dropping

// Math way (only two eggs)
function eggDropping(floors: number): number {
  // The best solution for the egg dropping problem is to cover the amount of floors
  // that would be worst case scenario

  // We can do that by covering an amount that would be the amount of sums we would need
  // if we were to do n + (n - 1) + (n - 2) ... 2 + 1
  // So n would be the worst case scenario, because we are adding numbers n times
  // And if it breaks on the first drop, then we must test 0..n
  // If it breaks on the second drop, then we must test n..2n - 1 (or 2n - n - 1 = n - 1)
  // Etc

  // So if floors = 25, then:
  // x(x+1)/2 = 25 -> x^2 + x - 50 = 0 (quadratic equation)
  // (-1 + sqrt(1 + 200)) / 2
  // (-1 + 14.1) / 2 = 6.5 -> 7
  // We should round up in any case (7.1 -> 8) because we want to cover all floors
  // So in this case
  // 7 + 6 + 5 + 4 + 3 + 2 + 1 = 28
  // Which meets the minimum floors of 25

  return Math.ceil((-1 + Math.sqrt(1 + floors * 2 * 4)) / 2);
}

// Dynamic Programming way
function eggDropping_DP(eggs: number, floors: number): number {
  const values = [] as number[][];

  // While we make our matrix for our dynamic programming
  // We can fill:
  // [1][floor] = floor (1 egg on any floor will take that many floors)
  // [egg][0] = 0 (any amount of eggs on 0 floors is 0 trials)
  // [egg][1] = 1 (any amount of eggs on 1 floor is 1 trial)
  // [egg][floor] = MAX (we assume that the worst case scenario is infinity)
  for (let egg = 0; egg <= eggs; ++egg) {
    const row = [] as number[];
    for (let floor = 0; floor <= floors; ++floor) {
      // If there's only 1 egg, then the worst case is that floor
      if (egg == 1) {
        row.push(floor);
        continue;
      }

      // For floor = 0, floor = 1 the worst case is the amount they are
      if (floor < 2) {
        row.push(floor);
        continue;
      }

      // Everything else starts off as infinite trials (so when we get the worst
      // we can compare)
      row.push(Number.MAX_SAFE_INTEGER);
    }
    values.push(row);
  }

  // Let's go through 2 -> eggs and 2 -> floors
  // We skip:
  // egg = 0 because 0 eggs makes no sense.
  // egg = 1 because that case has been done before
  // floor = 0 or 1 because that case has been done before
  for (let egg = 2; egg <= eggs; ++egg) {
    for (let maxFloor = 2; maxFloor <= floors; ++maxFloor) {
      // We want to compare The floors below with our current floor
      for (
        let currentFloor = 1;
        currentFloor < maxFloor;
        ++currentFloor
      ) {
        // We get the highest between:
        // values[egg - 1][current - 1] the egg breaks, and we know it must below current
        // and we have 1 less egg to use
        // values[egg][floor - current] the egg is good, and we know it must be above current
        // and we check max - current floors
        const newWorst = 1 +
          Math.max(
            values[egg - 1][currentFloor - 1],
            values[egg][maxFloor - currentFloor],
          );

        // If we got a new worse, then set it
        if (newWorst < values[egg][maxFloor]) {
          values[egg][maxFloor] = newWorst;
        }
      }
    }
  }

  // We calculated all 0..eggs and all 0..floors
  // so we just have to return the one from provided info
  return values[eggs][floors];
}

export { eggDropping, eggDropping_DP };

// 4. Coin Change

// Passing index
function coinChange_Brute(coins: number[], sum: number): number {
  // Helper recursively gets if the current coinIndex should be included or excluded
  // By picking which one is better (less coinsUsed)
  function helper(
    currentSum: number,
    coinIndex: number,
    coinsUsed: number,
  ): number {
    // If the currentSum is too large or we reached the end, this path is bad
    // And we return infinity
    if (currentSum > sum || coinIndex == coins.length) {
      return Number.MAX_SAFE_INTEGER;
    }

    // If we reached the sum, return the amount of coins used
    if (currentSum == sum) return coinsUsed;

    // Gets the amount of coins used if we include (getting the best
    // by recursively calling)
    const include = helper(
      currentSum + coins[coinIndex],
      coinIndex,
      coinsUsed + 1,
    );

    // Gets the amount of coins used if we exclude this (increment coinIndex)
    const exclude = helper(currentSum, coinIndex + 1, coinsUsed);

    // Picks the best, including or excluding
    return Math.min(include, exclude);
  }

  return helper(0, 0, 0);
}

// Passing coin array
function coinChange_Brute2(coins: number[], sum: number): number {
  // Helper recursively gets if the current coinIndex should be included or excluded
  // by picking which one is better (less coinsUsed)
  function helper(
    currentSum: number,
    coins: number[],
    coinsUsed: number,
  ): number {
    // If the currentSum is too large or we reached the end, this path is bad
    // And we return infinity
    if (currentSum > sum || coins.length == 0) {
      return Number.MAX_SAFE_INTEGER;
    }

    // If we reached the sum, return the amount of coins used
    if (currentSum == sum) return coinsUsed;

    // Gets the amount of coins if we include the current coin
    // (recursively calling to get the best path)
    const include = helper(currentSum + coins[0], coins, coinsUsed + 1);

    // Gets the amount of coins if we exclude the current coin (cut it off the array)
    const exclude = helper(currentSum, coins.slice(1), coinsUsed);

    // Pick the best, including or excluding it
    return Math.min(include, exclude);
  }

  return helper(0, coins, 0);
}

function coinChange_DP(coins: number[], sum: number): number {
  // [coinIndex][sum] = coinsUsed
  const coinsUsed = [] as number[][];

  for (let coin = 0; coin <= coins.length; ++coin) {
    coinsUsed[coin] = [];
    for (let toSum = 0; toSum <= sum; ++toSum) {
      // Set all coins used to 0
      coinsUsed[coin][toSum] = 0;

      // If we don't have any coins
      if (coin == 0) {
        // We would use infinity
        coinsUsed[coin][toSum] = Number.MAX_SAFE_INTEGER;
      }

      // If we only have one coin...
      if (coin == 1) {
        // Check to see if the sum is a multiple of the coin
        if (toSum % coins[0] == 0) {
          // If it is, then we have to use that many coins
          coinsUsed[1][toSum] = toSum / coins[0];
        } else {
          // If not, then we would use infinity
          coinsUsed[1][toSum] = Number.MAX_SAFE_INTEGER;
        }
      }
    }
  }

  // We solved coin = 0 (infinity) and coin = 1 (multiples), so we start at coin = 2
  for (let coin = 2; coin <= coins.length; ++coin) {
    // We solved toSum = 0 (0 sum, 0 coins) so we start at toSum = 1
    for (let toSum = 1; toSum <= sum; ++toSum) {
      // If we include the coin, we subtract the sum by the coin
      // We do coin - 1 because coin = 0 is no coins,
      // coin = 1 is the 1st (or 0 index in coins)
      // We add 1 because we are using one more coin
      const include = coinsUsed[coin][toSum - coins[coin - 1]] + 1;

      // If we exclude, we just move to the next coin
      // And don't add one because we didn't use any coins
      const exclude = coinsUsed[coin - 1][toSum];

      // Is it possible to even include this coin?
      // Aka is the sum big enough (we can't put a coin worth 5 in to a sum of 2)
      const canInclude = coins[coin - 1] <= toSum;

      // We can include the coin
      if (canInclude) {
        // Pick the best between including and excluding
        coinsUsed[coin][toSum] = Math.min(include, exclude);
        continue;
      }

      // If not, we must exclude the coin
      coinsUsed[coin][toSum] = exclude;
    }
  }

  // Get the coins used for the given input
  return coinsUsed[coins.length][sum];
}

export { coinChange_Brute, coinChange_Brute2, coinChange_DP };

// 5. Longest Common Subsequence

function lcs_Brute(s1: string, s2: string): number {
  function helper(i1: number, i2: number, length: number): number {
    if (i1 == s1.length || i2 == s2.length) return length;

    // If the current char is the same
    if (s1.charAt(i1) == s2.charAt(i2)) {
      // Progress to the next char for both and increase the LCS length
      return helper(i1 + 1, i2 + 1, length + 1);
    } else {
      // If not, get the best between i1 + 1 and i2 + 1
      return Math.max(helper(i1 + 1, i2, length), helper(i1, i2 + 1, length));
    }
  }

  return helper(0, 0, 0);
}

function lcs_DP(s1: string, s2: string): number {
  const subsequences = [] as number[][];

  for (let i = 0; i <= s1.length; ++i) {
    subsequences[i] = [];
    for (let j = 0; j <= s2.length; ++j) {
      subsequences[i][j] = 0;
    }
  }

  for (let i = 1; i <= s1.length; ++i) {
    for (let j = 1; j <= s2.length; ++j) {
      // If the chars are equal
      if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
        // Then the last (i - 1), (j - 1) + 1 is the largest
        subsequences[i][j] = subsequences[i - 1][j - 1] + 1;
      } else {
        // If not, then get from (i - 1) OR (j - 1)
        subsequences[i][j] = Math.max(
          subsequences[i - 1][j],
          subsequences[i][j - 1],
        );
      }
    }
  }

  return subsequences[s1.length][s2.length];
}

export { lcs_Brute, lcs_DP };

// 6. Longest Increasing Subsequence

function lis_Brute(nums: number[]): number {
  function helper(previous: number, index: number, length: number): number {
    if (index == nums.length) return length;

    const exclude = helper(previous, index + 1, length);

    // Can we even include the current number?
    const canInclude = nums[index] > previous;
    if (canInclude) {
      const include = helper(nums[index], index + 1, length + 1);

      // Get the best between including and excluding it
      return Math.max(include, exclude);
    }

    // We can only exclude it
    return exclude;
  }

  return helper(Number.MIN_SAFE_INTEGER, 0, 0);
}

function lis_DP(nums: number[]): number {
  // [index] = subsequence length
  const maxLIS = [] as number[];

  // Every LIS at that index is 0
  for (let i = 0; i < nums.length; ++i) {
    maxLIS[i] = 1;
  }

  let max = 1;

  for (let i = 0; i < nums.length; ++i) {
    for (let j = 0; j < i; ++j) {
      // Is i > j? Then maybe the subsequence for this index is to be replaced
      if (nums[i] > nums[j]) {
        // Do we want to keep the current max for this index?
        const keep = maxLIS[i];
        // Or is there a new biggest
        const replacement = maxLIS[j] + 1;
        maxLIS[i] = Math.max(keep, replacement);

        // Always store whatever is the max
        max = Math.max(max, maxLIS[i]);
      }
    }
  }

  return max;
}

export { lis_Brute, lis_DP };

// 7. Heap Sort

function heapsort<T>(a: T[], compare: (o1: T, o2: T) => number): T[] {
  const arr = [...a];

  function max_heapify(arr: T[], heapSize: number, headLocation: number) {
    let largest = headLocation;
    const left = 2 * headLocation + 1;
    const right = 2 * headLocation + 2;

    // Get location of largest
    if (left < heapSize && compare(arr[left], arr[largest]) > 0) {
      largest = left;
    }
    if (right < heapSize && compare(arr[right], arr[largest]) > 0) {
      largest = right;
    }

    // If the largest head isn't the root node
    if (largest != headLocation) {
      // Swap them
      [arr[headLocation], arr[largest]] = [arr[largest], arr[headLocation]];

      // And fix rest
      max_heapify(arr, heapSize, largest);
    }
  }

  // Make the current array as a max heap (parent node is the most)
  // We start at arr.length / 2 - 1 because as a max heap, the leaf
  // nodes will start after that. E.g.
  //       1
  //    2    3
  //   4 5  6 7
  // The amount of leaf nodes is 4 (arr.length = 7) 7 / 2 = 3 - 1 is 2
  // And arr[2] would be the 3 node
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; --i) {
    max_heapify(arr, arr.length, i);
  }

  // loop through the whole array and make sure we are getting the biggest
  // number from the max heap
  for (let i = arr.length - 1; i > 0; --i) {
    [arr[0], arr[i]] = [arr[i], arr[0]];

    max_heapify(arr, i, 0);
  }

  return arr;
}

function heapsortAsc(arr: number[]): number[] {
  return heapsort(arr, (a, b) => a - b);
}

function heapsortDesc(arr: number[]): number[] {
  return heapsort(arr, (a, b) => b - a);
}

export { heapsort, heapsortAsc, heapsortDesc };

// 8. Breadth First Search

function bfs<T>(head: Node<T>, found: (o: T) => boolean): boolean {
  // BFS is implemented by doing a queue and doing first in, first out
  const queue = [head] as Node<T>[];

  while (queue.length > 0) {
    // Get the first element in the queue and remove it
    const current = queue.splice(0, 1)[0];

    // Add all the children to the queue
    queue.push(...(current.children ?? []));

    // If we have found it, stop the search
    if (found(current.key)) {
      return true;
    }
  }

  return false;
}

export { bfs };

// 9. Depth First Search

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

// 10. Kruskal’s Algorithm

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

// 11. Binary Search

function binarysearch<T>(a: T[], compare: (o: T) => number): boolean {
  // Start using full array
  let l = 0;
  let r = a.length;

  // Calculate the middle depending on left and right
  const m = () => Math.floor((r + l) / 2);

  while (l < r) {
    const c = compare(a[m()]);

    // If it is the value, return true
    if (c == 0) {
      return true;
    }

    // If it's less or more, then reset left or right
    if (c < 0) {
      l = m() + 1;
    } else {
      r = m();
    }
  }

  return false;
}

export { binarysearch };

// 12. Prim’s Algorithm

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

// 13. Bellman Ford Algorithm

function bellmanFord(graph: Graph, source: Vertex) {
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

export { bellmanFord };

// 14. Dijkstra Algorithm

function dijkstra(graph: Graph, source: Vertex) {
  let unvisited = [...graph.vertexes];
  let edges = [...graph.edges];
  const distances = {} as { [key: string]: number };
  const previous = {} as { [key: string]: string };

  for (const v of unvisited) {
    distances[v.key] = Number.MAX_SAFE_INTEGER;
    previous[v.key] = "";
  }

  distances[source.key] = 0;
  previous[source.key] = source.key;
  let currentNode = source;

  const nextNodes = [source] as Vertex[];

  while (unvisited.length > 0) {
    currentNode = nextNodes.splice(0, 1)[0];

    const connectedEdges = edges.filter((e) =>
      e.from == currentNode || e.to == currentNode
    );
    edges = edges.filter((e) => !connectedEdges.includes(e));

    for (const edge of connectedEdges) {
      const distance = distances[currentNode.key];
      const node = edge.from == currentNode ? edge.to : edge.from;
      const weight = edge.weight;
      if (distances[node.key] > distance + weight) {
        distances[node.key] = distance + weight;
        previous[node.key] = currentNode.key;
      } else if (distances[node.key] + weight < distance) {
        distances[currentNode.key] = distances[node.key] + weight;
        previous[currentNode.key] = node.key;
      }
      if (unvisited.includes(node) && !nextNodes.includes(node)) {
        nextNodes.push(node);
      }
    }

    if (currentNode == undefined) {
      break;
    }

    unvisited = unvisited.filter((v) => v != currentNode);
  }

  return { distances, previous };
}

export { dijkstra };

// 15. Secure Hash Algorithm
// 16. Integer Factorization

function integerfactorization_Brute(num: number) {
  const factors = [] as number[];

  for (let i = 2; i < num; ++i) {
    while (num % i == 0) {
      factors.push(i);
      num /= i;
    }
  }

  return factors;
}

function integerfactorization_DP(num: number) {
  const factors = [] as number[][];
  const primeNumbers = [] as number[];

  for (let i = 0; i <= num; ++i) {
    factors[i] = [i];
  }

  factors[0] = [0];
  factors[1] = [1];

  for (let i = 2; i <= num; ++i) {
    const f = [] as number[];
    let current = i;

    for (let j = primeNumbers.length - 1; j >= 0; --j) {
      while (current % primeNumbers[j] == 0) {
        current /= primeNumbers[j];
        f.push(primeNumbers[j]);
      }
    }

    if (current > 1) {
      f.push(current);
      primeNumbers.push(current);
    }

    factors[i] = f;
  }

  return [...factors[num], 1];
}

export { integerfactorization_Brute, integerfactorization_DP };

// 17. Selection Sort

function selectionsort<T>(a: T[], compare: (o1: T, o2: T) => number): T[] {
  const arr = [...a];

  for (let i = 0; i < arr.length; ++i) {
    let smallestIndex = i;

    for (let j = i; j < arr.length; ++j) {
      if (compare(arr[j], arr[smallestIndex]) < 0) {
        smallestIndex = j;
      }
    }

    [arr[i], arr[smallestIndex]] = [arr[smallestIndex], arr[i]];
  }

  return arr;
}

function selectionsortAsc(arr: number[]): number[] {
  return selectionsort(arr, (a, b) => a - b);
}

function selectionsortDesc(arr: number[]): number[] {
  return selectionsort(arr, (a, b) => b - a);
}

export { selectionsort, selectionsortAsc, selectionsortDesc };

/*
==============================
Types / Misc
==============================
*/

// Graph (edge, and vertex) for Kruskal's, Prim's, Bellman Ford

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
