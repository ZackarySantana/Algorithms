import * as a from "../../../typescript.ts";

// Breadth First Search

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
  } as a.Node<number>;
  
  Deno.test(async function bfs(t) {
    await t.step("full search", () => {
      let order = "";
  
      a.bfs(testNode1, (k) => {
        order += k + ",";
        return false;
      });
  
      a.assertEquals(order, "5,2,22,5,10,20,0,24,-100,");
    });
  
    await t.step("half search", () => {
      let order = "";
  
      a.bfs(testNode1, (k) => {
        order += k + ",";
        return k == 20;
      });
  
      a.assertEquals(order, "5,2,22,5,10,20,");
    });
  });
  
  // Depth First Search
  
  Deno.test(async function dfs(t) {
    await t.step("full search", () => {
      let order = "";
  
      a.dfs(testNode1, (k) => {
        order += k + ",";
        return false;
      });
  
      a.assertEquals(order, "5,10,2,20,-100,24,0,22,5,");
    });
  
    await t.step("half search", () => {
      let order = "";
  
      a.dfs(testNode1, (k) => {
        order += k + ",";
        return k == 0;
      });
  
      a.assertEquals(order, "5,10,2,20,-100,24,0,");
    });
  });