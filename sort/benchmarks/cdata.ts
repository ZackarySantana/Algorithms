import { numberWithCommas, writeFile } from "../../utils/utils.ts";

const createRandomDataEntry = (size: number, range: number) => {
  const arr = [] as number[];
  for (let i = 0; i < size; ++i) {
    arr.push(Math.floor(Math.random() * range));
  }
  return {
    name: `${numberWithCommas(size)} elements, ${
      numberWithCommas(range)
    } range`,
    data: arr,
  };
};

writeFile(`${Deno.args.length > 0 ? Deno.args.join(".") : "data.json"}`, [
  createRandomDataEntry(10, 5),
  createRandomDataEntry(1000, 100),
  createRandomDataEntry(100000, 10000),
  createRandomDataEntry(100000, 100000),
  createRandomDataEntry(1000000, 10000),
  createRandomDataEntry(1000000, 1000000),
]);
