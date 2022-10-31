#!/bin/bash

source utils.sh

# ts_bench ${folder name}
function ts_bench {
    echo -e "${YELLOW}Running Typescript \"${RED}${1}${YELLOW}\" benchmarks${RESET}"
    typescript_benchmark=$(deno bench --unstable ${1}/benchmarks/typescript.bench.ts | sed "s/\x1B\[\([0-9]\{1,2\}\(;[0-9]\{1,2\}\)\?\)\?[mGK]//g")
    echo "${typescript_benchmark}" > "${benchmark_dir}/${1}.typescript.log"
    echo -e "${GREEN}Finished Typescript benchmarks (inside ${benchmark_dir})${RESET}"
}

mkdir -p ${benchmark_dir}

function benchmarks {
    for benchmark in "$@" 
    do
        if [[ " ${types[*]} " =~ " ${benchmark} " ]]; then
            ts_bench $benchmark
        else
            echo -e "${RED}Skipping $benchmark. NOT FOUND${RESET}"
        fi
    done
}

if [ $# -eq 0 ]; then
    benchmarks ${types[@]}
else 
    benchmarks $@
fi
