import * as lab2 from "./lab2.ts";

// 5. Longest Common Subsequence

const LCSBench = (s1: string, s2: string, group: string) => {
  Deno.bench(
    "LCS Brute Force - " + group,
    { group: "Longest Common Subsequence " + group },
    () => {
      lab2.lcs_Brute(s1, s2);
    },
  );

  Deno.bench(
    "LCS DP Solution - " + group,
    { group: "Longest Common Subsequence " + group },
    () => {
      lab2.lcs_DP(s1, s2);
    },
  );
};

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const createRandomString = (size: number) => {
  let s = "";
  for (let i = 0; i < size; ++i) {
    let letter = letters[Math.floor(Math.random() * letters.length)];
    if (Math.random() > 0.5) {
      letter = letter.toLowerCase();
    }
    s += letter;
  }
  return s;
};

LCSBench(createRandomString(5), createRandomString(5), "Small Size");
LCSBench(createRandomString(10), createRandomString(10), "Medium Size");
LCSBench(createRandomString(15), createRandomString(15), "Large Size");
