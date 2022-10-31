#!/bin/bash

source utils/constants.sh

# ts_bench ${folder name}
function ts_bench {
    echo -e "${YELLOW}Running Typescript \"${RED}${1}${YELLOW}\" benchmarks${RESET}"
    typescript_benchmark=$(deno bench --unstable ${1}/benchmarks/typescript.bench.ts | sed "s/\x1B\[\([0-9]\{1,2\}\(;[0-9]\{1,2\}\)\?\)\?[mGK]//g")
    echo "${typescript_benchmark}" > "${benchmark_dir}/${1}.typescript.log"
    echo -e "${GREEN}Finished Typescript benchmarks (inside ${benchmark_dir})${RESET}"
}

# run_benchmark ${Language} ${Benchmark name} ${Benchmark command}
function run_benchmark {
    echo -e "${YELLOW}Running $1 ${RESET}${2}${YELLOW} benchmarks${RESET}"
    typescript_benchmark=$($3 | sed "s/\x1B\[\([0-9]\{1,2\}\(;[0-9]\{1,2\}\)\?\)\?[mGK]//g")
    echo "${typescript_benchmark}" > "${benchmark_dir}/${2}.${1,,}.log"
    echo -e "${GREEN}Finished ${1} benchmarks (inside ${benchmark_dir})${RESET}"
}

mkdir -p ${benchmark_dir}

all=1
typescript=0
java=0

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

while getopts ":l:" opt; do
    case $opt in
        l)
            echo -e "${YELLOW}Only testing languages: '$OPTARG'${RESET}"
            all=0
            for i in $OPTARG; do
                if [ ${i,,} = "typescript" ]; then
                    typescript=1
                elif [ ${i,,} = "java" ]; then
                    java=1
                fi
            done
        ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
        ;;
    esac
done

shift $(($OPTIND - 1))

if [ $# -eq 0 ]; then
    benchmarks ${types[@]}
else
    benchmarks $@
fi