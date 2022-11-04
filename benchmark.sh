#!/bin/bash

source utils/constants.sh
source utils/languages.sh

# run_benchmark ${Language} ${Benchmark name} ${Benchmark command}
function run_benchmark {
    if [ $output_to_console -eq 0 ]; then
        echo -e "${YELLOW}Running $1 ${RESET}${2}${YELLOW} benchmarks${RESET}"
        benchmark_results=$($3 | sed "s/\x1B\[\([0-9]\{1,2\}\(;[0-9]\{1,2\}\)\?\)\?[mGK]//g" 2>&1)
        mkdir -p ${output}/${1,,}
        echo "${benchmark_results}" > "${output}/${1,,}/${2,,}.log"
        echo -e "${GREEN}Finished ${1} benchmarks (inside ${output}/${1})${RESET}"
    else
        $3
    fi
}

# ${List of benchmarks}
function benchmarks {
    for benchmark in "$@" 
    do
        if [[ " ${types[*]} " =~ " ${benchmark} " ]]; then
            if [ -f "${benchmark}/benchmarks/${data_filename}" ]; then
                if [ $typescript -eq 1 ]; then
                    run_benchmark "Typescript" "${benchmark}" "deno bench --unstable --allow-read ${benchmark}/benchmarks -- $data_filename"
                fi
            else
                echo -e "${RED}NOT FOUND DATA FILE \"${benchmark}/benchmarks/${data_filename}\": Skipping${RESET}"
            fi
        else
            echo -e "${RED}NOT FOUND \"${benchmark}\": Skipping${RESET}"
        fi
    done
}

if [ $# -eq 0 ]; then
    benchmarks ${types[@]}
else
    benchmarks $@
fi
