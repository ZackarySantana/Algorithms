#!/bin/bash

source utils/constants.sh
source utils/languages.sh

# run_test ${Language} ${Test name} ${Test command} ${Failed keyword}
function run_test {
    echo -e "${YELLOW}Running $1 ${RESET}$2${YELLOW} tests${RESET}"
    test_results=$($3)
    if [[ $test_results == *"$4"* ]]; then
        echo -e "${LINE}"
        echo -e "$test_results" | grep -C 4 --group-separator=$'\n\033[1;34m==============================\033[0;0m\n' $4
        echo -e "${BLUE}==============================${RESET}"
        echo -e "${RED}$1 ${RESET}$2${RED} test failed ${RESET}"
    else
        echo -e "${GREEN}$1 ${RESET}$2${GREEN} tests passed!${RESET}\n"
    fi
}

function tests {
    for test in "$@" 
    do
        if [[ " ${types[*]} " =~ " ${test} " ]]; then
            if [ $all -eq 1 ] || [ $typescript -eq 1 ]; then
                run_test "Typescript" "${test}" "deno test ${test}/tests" "FAILED"
            fi
        else
            echo -e "${RED}NOT FOUND: Skipping ${test}.${RESET}"
        fi
    done
}

if [ $# -eq 0 ]; then
    tests ${types[@]}
else
    tests $@
fi