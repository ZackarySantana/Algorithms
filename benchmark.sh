#!/bin/bash

source utils/constants.sh
source utils/languages.sh

# run_benchmark ${Language} ${Benchmark name} ${Benchmark command}
function run_benchmark {
    echo -e "${YELLOW}Running $1 ${RESET}${2}${YELLOW} benchmarks${RESET}"
    benchmark_results=$($3 | sed "s/\x1B\[\([0-9]\{1,2\}\(;[0-9]\{1,2\}\)\?\)\?[mGK]//g")
    mkdir -p ${benchmark_dir}/${1,,}
    echo "${benchmark_results}" > "${benchmark_dir}/${1,,}/${2,,}.log"
    echo -e "${GREEN}Finished ${1} benchmarks (inside ${benchmark_dir}/${1})${RESET}"
}

function benchmarks {
    for benchmark in "$@" 
    do
        if [[ " ${types[*]} " =~ " ${benchmark} " ]]; then
            if [ $all -eq 1 ] || [ $typescript -eq 1 ]; then
                run_benchmark "Typescript" "${benchmark}" "deno bench --unstable ${benchmark}/benchmarks"
            fi
        else
            echo -e "${RED}NOT FOUND: Skipping ${benchmark}.${RESET}"
        fi
    done
}

if [ $# -eq 0 ]; then
    benchmarks ${types[@]}
else
    benchmarks $@
fi
