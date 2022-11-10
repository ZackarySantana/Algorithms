#!/bin/bash

source utils/constants.sh
source utils/languages.sh
source utils/utils.sh

# run_benchmark ${Language} ${Benchmark name} ${Benchmark command}
function run_benchmark {
    if [ $output_to_console -eq 0 ]; then
        echo -e "  ${YELLOW}Running $1${RESET}"
        benchmark_results=$($3 | sed "s/\x1B\[\([0-9]\{1,2\}\(./bench;[0-9]\{1,2\}\)\?\)\?[mGK]//g" 2>&1)
        mkdir -p ${output_benchmark}/${1,,}
        echo "${benchmark_results}" > "${output_benchmark}/${1,,}/${2,,}.log"
        echo -e "  ${GREEN}Finished ${1} (inside ${output_benchmark}/${1,,})${RESET}"
    else
        $3
    fi
}

# ${Benchmark}
function typescript_benchmark {
    if [ $typescript -eq 1 ]; then
        if file_exists "Typescript" "${1}/benchmarks/typescript.bench.ts"; then
            run_benchmark "Typescript" "${1}" "deno bench --unstable --allow-read ${1}/benchmarks/typescript.bench.ts -- ${data_filename}"
        fi
    fi
}

# ${Benchmark}
function fsharp_benchmark {
    if [ $fsharp -eq 1 ]; then
        if file_exists "F#" "${1}/benchmarks/f#.bench.fsx"; then
            run_benchmark "f#" "${1}" "dotnet fsi ${1}/benchmarks/f#.bench.fsx ${data_filename}"
        fi
    fi
}

# ${List of benchmarks}
function benchmarks {
    for benchmark in "$@" 
    do
        if [[ " ${types[*]} " =~ " ${benchmark} " ]]; then
            if [ -f "${benchmark}/benchmarks/${data_filename}" ]; then
                echo -e "${YELLOW}${benchmark} benchmarks:${RESET}"
                typescript_benchmark ${benchmark}
                fsharp_benchmark ${benchmark}
                echo ""
            else
                if [ $hide_notfound -eq 0 ]; then
                    echo -e "${RED}${benchmark} failed. Benchmark data file not found${RESET}\n"
                fi
            fi
        else
            if [ $hide_notfound -eq 0 ]; then
                echo -e "${RED}${benchmark} failed. Benchmark not found${RESET}\n"
            fi
        fi
    done
}

if [ $# -eq 0 ]; then
    benchmarks ${types[@]}
else
    benchmarks $@
fi
