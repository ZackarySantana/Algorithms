# Algorithms

This is Zackary Santana's personal repository of different algorithms with tests + benchmarks for each.

Currently the following languages have been used to amke the algorithms
- TypeScript

## test.sh

The `test.sh` file runs tests for the algorithms across languages, with specific test files. Here are some example usage:

Runs all tests for all algorithms for all languages
```bash
./test.sh
```

Runs all tests for all algorithsm for only TypeScript and Java (case insensitive)
```bash
./test.sh -l "typescript java"
```

Runs all tests for the sort and eggdrop algorithms for only TypeScript (case insensitive)
```bash
./test.sh -l "typescript" sort eggdrop
```

## benchmark.sh

The `benchmark.sh` file runs benchmarks for the algorithms across languages, using (by default) the data in the data.json file inside the benchmarks. Then it outputs it in to the `benchmark_results` folder. Here are some example usage:

Runs all benchmarks for all algorithms for all languages
```bash
./benchmark.sh
```

Runs all benchmarks for all algorithms for only TypeScript and F# (case insensitive)
```bash
./benchmark.sh -l "typescript f#"
```

Runs all benchmarks for the coinchange and integerfactorization algorithms for only TypeScript (case insensitive)
```bash
./benchmark.sh -l typescript coinchange integerfactorization
```

Runs all benchmarks and ouputs it to `benchmark_results_2`
```bash
./benchmark.sh -o benchmark_results_2
```

Runs all benchmarks using the data file `datafile.json`
```bash
./benchmark.sh -n datafile.json
```


## cdata.sh