import { numberWithCommas, writeDataFile } from "../../utils/utils.ts";

export type SortData = {
  group: string;
  data: number[];
};

const createRandomDataEntry = (size: number, range: number) => {
  const arr = [] as number[];
  for (let i = 0; i < size; ++i) {
    arr.push(Math.floor(Math.random() * range));
  }
  return {
    group: `${numberWithCommas(size)} elements, ${
      numberWithCommas(range)
    } range`,
    data: arr,
  } as SortData;
};

writeDataFile([
  createRandomDataEntry(10, 5),
  createRandomDataEntry(1000, 100),
  createRandomDataEntry(100000, 10000),
  createRandomDataEntry(100000, 100000),
  createRandomDataEntry(1000000, 10000),
  createRandomDataEntry(1000000, 1000000),
]);
