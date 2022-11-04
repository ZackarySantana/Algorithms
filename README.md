# Algorithms

This is Zackary Santana's personal repository of different algorithms with tests + benchmarks for each.

Currently the following languages have been used to amke the algorithms
- TypeScript

## test.sh

The `test.sh` file runs tests for the algorithms across languages, with specific test files.

Options:
-l "lanaguages here" : Specifies languages
-v : Verbose, will output test results always regardless pass or fail

Here are some example usage:

Runs all tests for all algorithms for all languages
```bash
./test.sh
```

Runs all tests for all algorithsm for only TypeScript and Java (case insensitive)
```bash
./test.sh -l "typescript java"
```

Runs all tests for all algorithsm for only TypeScript and Java (case insensitive) and outputs their test results (verbose)
```bash
./test.sh -l "typescript java" -v
```

Runs all tests for the sort and eggdrop algorithms for only TypeScript (case insensitive)
```bash
./test.sh -l "typescript" sort eggdrop
```

## benchmark.sh

The `benchmark.sh` file runs benchmarks for the algorithms across languages, using (by default) the data in the data.json file inside the benchmarks. Then it outputs it in to the `benchmark_results` folder. Here are some example usage:

Options:
-c : Output to console only (default is false)
-l "lanaguages here" : Specify languages (default is all)
-o "Output folder" : Outputs to the given argument (default is benchmark_results)
-n "Datafile name" : Reads the datafile provided (default is data.json)

Runs all benchmarks for all algorithms for all languages
```bash
./benchmark.sh
```

Runs all benchmarks for all algorithms for all languages and _only_ outputs it to the console
```bash
./benchmark.sh -c
```

Runs all benchmarks for all algorithms for only TypeScript and F# (case insensitive)
```bash
./benchmark.sh -l "typescript f#"
```

Runs all benchmarks for the coinchange and integerfactorization algorithms for only TypeScript (case insensitive)
```bash
./benchmark.sh -l typescript coinchange integerfactorization
```

Runs all benchmarks and ouputs it to `benchmark_results_2` folder
```bash
./benchmark.sh -o benchmark_results_2
```

Runs all benchmarks using the data file `datafile.json` (it will search for it in {algorithm}/benchmarks)
```bash
./benchmark.sh -n datafile.json
```

## cdata.sh

The `cdata.sh` file runs the `cdata.ts` files to create `data.json` files so benchmarks can be created using the same data. The `data.json` will be saved via source control but if you want to make your own samples you can do so using this command.

Options:
-o "Output file" : Outputs the data to the argument (default is data.json)

Here are some example usage:

Creates a data.json for all algorithms
```bash
./cdata.sh
```

Creates a data.json for coinchange and integerfactorization
```bash
./cdata.sh coinchange integerfactorization
```

Creates a *test.json* for all algorithms
```bash
./cdata.sh -o test.json
```