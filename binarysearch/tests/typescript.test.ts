import * as a from "../../typescript.ts";

// Binary Search

Deno.test(async function binarysearch(t) {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
    for (const n of arr) {
      await t.step("existing element " + n, () => {
        const found = a.binarysearch(arr, (k) => {
          return k - n;
        });
  
        a.assertEquals(found, true);
      });
    }
  
    for (const n of [-1, 11]) {
      await t.step("nonexisting element " + n, () => {
        const found = a.binarysearch(arr, (k) => {
          return k - n;
        });
  
        a.assertEquals(found, false);
      });
    }
  
    await t.step("correct order 1", () => {
      let order = "";
  
      a.binarysearch(arr, (k) => {
        order += k + ",";
        return k - 1;
      });
  
      a.assertEquals(order, "6,3,2,1,");
    });
  
    await t.step("correct order 2", () => {
      let order = "";
  
      a.binarysearch(arr, (k) => {
        order += k + ",";
        return k - 8;
      });
  
      a.assertEquals(order, "6,9,8,");
    });
  });