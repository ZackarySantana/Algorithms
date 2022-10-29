import {
  assertArrayIncludes,
  assertEquals,
  assertObjectMatch,
  assertThrows,
  // assertInstanceOf,
} from "https://deno.land/std@0.160.0/testing/asserts.ts";
import * as lab2 from "./lab2.ts";
import type { Edge, Graph, Node, Vertex } from "./lab2.ts";

// 1. Quicksort

Deno.test(async function quicksort(t) {
  const asc = (a: number, b: number) => a - b;
  const desc = (a: number, b: number) => b - a;

  await t.step("asc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = lab2.quicksort(arr, asc);
    const sorted2 = lab2.quicksortAsc(arr);

    arr.sort(asc);

    assertEquals(sorted, arr);
    assertEquals(sorted2, arr);
  });

  await t.step("desc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = lab2.quicksort(arr, desc);
    const sorted2 = lab2.quicksortDesc(arr);

    arr.sort(desc);

    assertEquals(sorted, arr);
    assertEquals(sorted2, arr);
  });

  await t.step("empty", () => {
    const arr = [] as number[];
    const sorted = lab2.quicksort(arr, asc);

    assertEquals(sorted, [] as number[]);
  });
});

// 2. Mergesort

Deno.test(async function mergesort(t) {
  const asc = (a: number, b: number) => a - b;
  const desc = (a: number, b: number) => b - a;

  await t.step("asc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = lab2.mergesort(arr, asc);
    const sorted2 = lab2.mergesortAsc(arr);

    arr.sort(asc);

    assertEquals(sorted, arr);
    assertEquals(sorted2, arr);
  });

  await t.step("desc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = lab2.mergesort(arr, desc);
    const sorted2 = lab2.mergesortDesc(arr);

    arr.sort(desc);

    assertEquals(sorted, arr);
    assertEquals(sorted2, arr);
  });

  await t.step("empty", () => {
    const arr = [] as number[];
    const sorted = lab2.mergesort(arr, asc);

    assertEquals(sorted, [] as number[]);
  });
});

// 3. Egg Dropping

Deno.test(async function eggDropping(t) {
  const testFloors = (
    floors: number,
    answer_2eggs: number,
    answer_3eggs: number,
  ) => {
    return t.step(`${floors} floors`, async (t) => {
      await t.step("math equation", () => {
        assertEquals(lab2.eggDropping(floors), answer_2eggs);
      });

      await t.step("dp solution (2 eggs)", () => {
        assertEquals(lab2.eggDropping_DP(2, floors), answer_2eggs);
      });

      await t.step("dp solution (3 eggs)", () => {
        assertEquals(lab2.eggDropping_DP(3, floors), answer_3eggs);
      });
    });
  };

  await testFloors(25, 7, 5);
  await testFloors(50, 10, 7);
  await testFloors(100, 14, 9);
  await testFloors(1000, 45, 19);

  // For 3 eggs, I compared with online like:
  // https://sankalpiitr.wordpress.com/2012/03/02/the-2-eggs-problem-extended-to-3-eggs/
  // Which give the answer (using math), to compare what my algorithm gets
});

// 4. Coin Change

Deno.test(async function coinChange(t) {
  const testCoins = (
    stepName: string,
    coins: number[],
    sum: number,
    coinsUsed: number,
  ) => {
    return t.step(stepName, async (t) => {
      await t.step(
        `brute force throws ${
          stepName == "stackoverflow" ? "throws " : ""
        }(Pass coin index)`,
        () => {
          if (stepName == "stackoverflow") {
            assertThrows(() => lab2.coinChange_Brute(coins, sum));
            return;
          }
          assertEquals(lab2.coinChange_Brute(coins, sum), coinsUsed);
        },
      );

      await t.step(
        `brute force ${
          stepName == "stackoverflow" ? "throws " : ""
        }(Pass coin array)`,
        () => {
          if (stepName == "stackoverflow") {
            assertThrows(() => lab2.coinChange_Brute2(coins, sum));
            return;
          }
          assertEquals(lab2.coinChange_Brute2(coins, sum), coinsUsed);
        },
      );

      await t.step("dp solution", () => {
        assertEquals(lab2.coinChange_DP(coins, sum), coinsUsed);
      });
    });
  };

  await testCoins("simple", [1, 2, 3], 6, 2);
  await testCoins("complex", [186, 419, 83, 408], 6249, 20);
  await testCoins(
    "stackoverflow",
    [186, 419, 83, 408, 90, 5, 10204],
    6249495,
    626,
  );
});

// 5. Longest Common Subsequence

Deno.test(async function lcs(t) {
  const testLCS = (
    stepName: string,
    s1: string,
    s2: string,
    solution: number,
  ) => {
    return t.step(stepName, async (t) => {
      await t.step("brute force", () => {
        assertEquals(lab2.lcs_Brute(s1, s2), solution);
      });

      await t.step("dp solution", () => {
        assertEquals(lab2.lcs_DP(s1, s2), solution);
      });
    });
  };

  await testLCS("simple 1", "abcde", "ace", 3);
  await testLCS("simple 2", "abc", "abc", 3);
  await testLCS("simple 3", "abc", "def", 0);
  await testLCS("complex", "bsbininm", "jmjkbkjkv", 1);
});

// 6. Longest Increasing Subsequence

Deno.test(async function lis(t) {
  const testLIS = (
    stepName: string,
    nums: number[],
    solution: number,
  ) => {
    return t.step(stepName, async (t) => {
      await t.step("brute force", () => {
        assertEquals(lab2.lis_Brute(nums), solution);
      });

      await t.step("dp solution", () => {
        assertEquals(lab2.lis_DP(nums), solution);
      });
    });
  };

  await testLIS("simple 1", [10, 9, 2, 5, 3, 7, 101, 18], 4);
  await testLIS("simple 2", [1, 5, 2, 3, 6, 7, 8], 6);
  await testLIS("simple 3", [7, 5, 3, 3, 6, 7, 8], 4);
  await testLIS("simple 4", [7, 5, 3, 3, 6, 7, 2], 3);
  await testLIS("simple 5", [0, 1, 0, 3, 2, 3], 4);
});

// 7. Heap Sort

Deno.test(async function heapsort(t) {
  const asc = (a: number, b: number) => a - b;
  const desc = (a: number, b: number) => b - a;

  await t.step("asc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = lab2.heapsort(arr, asc);
    const sorted2 = lab2.heapsortAsc(arr);

    arr.sort(asc);

    assertEquals(sorted, arr);
    assertEquals(sorted2, arr);
  });

  await t.step("desc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = lab2.heapsort(arr, desc);
    const sorted2 = lab2.heapsortDesc(arr);

    arr.sort(desc);

    assertEquals(sorted, arr);
    assertEquals(sorted2, arr);
  });

  await t.step("empty", () => {
    const arr = [] as number[];
    const sorted = lab2.heapsort(arr, asc);

    assertEquals(sorted, [] as number[]);
  });
});

// 8. Breadth First Search

const testNode1 = {
  key: 5,
  children: [
    {
      key: 2,
      children: [{ key: 5 }, { key: 10 }],
    },
    {
      key: 22,
      children: [
        { key: 20 },
        {
          key: 0,
          children: [
            {
              key: 24,
              children: [{ key: -100 }],
            },
          ],
        },
      ],
    },
  ],
} as Node<number>;

Deno.test(async function bfs(t) {
  await t.step("full search", () => {
    let order = "";

    lab2.bfs(testNode1, (k) => {
      order += k + ",";
      return false;
    });

    assertEquals(order, "5,2,22,5,10,20,0,24,-100,");
  });

  await t.step("half search", () => {
    let order = "";

    lab2.bfs(testNode1, (k) => {
      order += k + ",";
      return k == 20;
    });

    assertEquals(order, "5,2,22,5,10,20,");
  });
});

// 9. Depth First Search

Deno.test(async function dfs(t) {
  await t.step("full search", () => {
    let order = "";

    lab2.dfs(testNode1, (k) => {
      order += k + ",";
      return false;
    });

    assertEquals(order, "5,10,2,20,-100,24,0,22,5,");
  });

  await t.step("half search", () => {
    let order = "";

    lab2.dfs(testNode1, (k) => {
      order += k + ",";
      return k == 0;
    });

    assertEquals(order, "5,10,2,20,-100,24,0,");
  });
});

// 10. Kruskal’s Algorithm

// vertexes : a , b , c , d , e , f
// edges    : ab, bc, ad, cf, ef

const a = { key: "a" } as Vertex;
const b = { key: "b" } as Vertex;
const c = { key: "c" } as Vertex;
const d = { key: "d" } as Vertex;
const e = { key: "e" } as Vertex;
const f = { key: "f" } as Vertex;
const ab = { from: a, to: b, weight: 3 } as Edge;
const bc = { from: b, to: c, weight: 1 } as Edge;
const ad = { from: a, to: d, weight: 3 } as Edge;
const cf = { from: c, to: f, weight: 2 } as Edge;
const ef = { from: e, to: f, weight: 5 } as Edge;
const minimumSpanningTree = {
  vertexes: [a, b, c, d, e, f],
  edges: [ab, bc, ad, cf, ef], // 14
} as Graph;

// Adding two extra vertexes that should be removed for the
// minimum spanning tree

const af = { from: a, to: f, weight: 10 };
const be = { from: b, to: e, weight: 6 };
const fullTree = {
  vertexes: [...minimumSpanningTree.vertexes],
  edges: [...minimumSpanningTree.edges, af, be],
} as Graph;

Deno.test(function kruskal() {
  const solution = lab2.kruskal(fullTree);

  for (const edge of solution.edges) {
    assertEquals(minimumSpanningTree.edges.includes(edge), true);
  }

  for (const vertex of solution.vertexes) {
    assertEquals(minimumSpanningTree.vertexes.includes(vertex), true);
  }
});

// 11. Binary Search

Deno.test(async function binarysearch(t) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  for (const n of arr) {
    await t.step("existing element " + n, () => {
      const found = lab2.binarysearch(arr, (k) => {
        return k - n;
      });

      assertEquals(found, true);
    });
  }

  for (const n of [-1, 11]) {
    await t.step("nonexisting element " + n, () => {
      const found = lab2.binarysearch(arr, (k) => {
        return k - n;
      });

      assertEquals(found, false);
    });
  }

  await t.step("correct order 1", () => {
    let order = "";

    lab2.binarysearch(arr, (k) => {
      order += k + ",";
      return k - 1;
    });

    assertEquals(order, "6,3,2,1,");
  });

  await t.step("correct order 2", () => {
    let order = "";

    lab2.binarysearch(arr, (k) => {
      order += k + ",";
      return k - 8;
    });

    assertEquals(order, "6,9,8,");
  });
});

// 12. Prim’s Algorithm

Deno.test(function prim() {
  const solution = lab2.prim(fullTree);

  for (const edge of solution.edges) {
    assertEquals(minimumSpanningTree.edges.includes(edge), true);
  }

  for (const vertex of solution.vertexes) {
    assertEquals(minimumSpanningTree.vertexes.includes(vertex), true);
  }
});

// 13. Bellman Ford Algorithm

Deno.test(function bellmanford() {
  const { distances, previous } = lab2.bellmanFord(fullTree, a);

  assertEquals(distances["a"], 0);
  assertEquals(distances["b"], 3);
  assertEquals(distances["c"], 4);
  assertEquals(distances["d"], 3);
  assertEquals(distances["e"], 9);
  assertEquals(distances["f"], 6);

  assertEquals(previous["a"], "a"); // a (0)
  assertEquals(previous["b"], "a"); // a -> b (3)
  assertEquals(previous["c"], "b"); // a -> b -> c (3 + 1)
  assertEquals(previous["d"], "a"); // a -> d (3)
  assertEquals(previous["e"], "b"); // a -> b -> e (3 + 6)
  assertEquals(previous["f"], "c"); // a -> b -> c -> f (3 + 1 + 2)
});

// 14. Dijkstra Algorithm

Deno.test(function dijkstra() {
  const { distances, previous } = lab2.dijkstra(fullTree, a);

  assertEquals(distances["a"], 0);
  assertEquals(distances["b"], 3);
  assertEquals(distances["c"], 4);
  assertEquals(distances["d"], 3);
  assertEquals(distances["e"], 9);
  assertEquals(distances["f"], 6);

  assertEquals(previous["a"], "a"); // a (0)
  assertEquals(previous["b"], "a"); // a -> b (3)
  assertEquals(previous["c"], "b"); // a -> b -> c (3 + 1)
  assertEquals(previous["d"], "a"); // a -> d (3)
  assertEquals(previous["e"], "b"); // a -> b -> e (3 + 6)
  assertEquals(previous["f"], "c"); // a -> b -> c -> f (3 + 1 + 2)
});

// 15. Secure Hash Algorithm
// 16. Integer Factorization

Deno.test(async function integerfactorization(t) {
  await t.step("of 10 brute force", () => {
    const solution = [1, 2, 5];

    assertArrayIncludes(solution, lab2.integerfactorization_Brute(10));
  });

  await t.step("of 10 dp", () => {
    const solution = [1, 2, 5];

    assertArrayIncludes(solution, lab2.integerfactorization_DP(10));
  });

  await t.step("of 294750 brute force", () => {
    const solution = lab2.integerfactorization_Brute(294750);

    assertArrayIncludes([1, 2, 3, 3, 5, 5, 5, 131], solution);
  });

  await t.step("of 294750 dp", () => {
    const solution = lab2.integerfactorization_DP(294750);

    assertArrayIncludes([1, 2, 3, 3, 5, 5, 5, 131], solution);
  });
});

// 17. Selection Sort

Deno.test(async function selectionsort(t) {
  const asc = (a: number, b: number) => a - b;
  const desc = (a: number, b: number) => b - a;

  await t.step("asc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = lab2.selectionsort(arr, asc);
    const sorted2 = lab2.selectionsortAsc(arr);

    arr.sort(asc);

    assertEquals(sorted, arr);
    assertEquals(sorted2, arr);
  });

  await t.step("desc", () => {
    const arr = [3, 5, 2, 7, 15, 0, 2, 8, 4];
    const sorted = lab2.selectionsort(arr, desc);
    const sorted2 = lab2.selectionsortDesc(arr);

    arr.sort(desc);

    assertEquals(sorted, arr);
    assertEquals(sorted2, arr);
  });

  await t.step("empty", () => {
    const arr = [] as number[];
    const sorted = lab2.selectionsort(arr, asc);

    assertEquals(sorted, [] as number[]);
  });
});
