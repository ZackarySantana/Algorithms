#!/bin/bash

source utils/constants.sh
source utils/languages.sh

# run_cdata ${Benchmark name} ${Data filename}
function run_cdata {
    echo -e "${YELLOW}Creating data for ${RESET}$1"
    $2
    echo -e "${GREEN}Finished creating ${1} data (inside ${1,,}/benchmarks)${RESET}"
}

function cdata {
    for benchmark in "$@" 
    do
        if [[ " ${types[*]} " =~ " ${benchmark} " ]]; then
            if [ -f "${benchmark}/benchmarks/cdata.ts" ]; then
                if [ $all -eq 1 ] || [ $typescript -eq 1 ]; then
                    run_cdata "${benchmark}" "deno run --allow-read --allow-write ${1,,}/benchmarks/cdata.ts $output"
                fi
            else
                echo -e "${RED}NOT FOUND: \"${benchmark}/benchmarks/cdata.ts\": Skipping${RESET}"
            fi
        else
            echo -e "${RED}NOT FOUND \"${benchmark}\": Skipping${RESET}"
        fi
    done
}

if [ $# -eq 0 ]; then
    cdata ${types[@]}
else
    cdata $@
fi