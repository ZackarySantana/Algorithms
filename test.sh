#!/bin/bash

source utils.sh

# run_test ${Test name} ${Test command} ${Failed keyword}
function run_test {
    echo -e "${YELLOW}Running $1 tests${RESET}"
    test_results=$($2)
    if [[ $test_results == *"$3 ("* ]]; then
      echo -e "${RED}$1 test failed: ${RESET}"
      echo -e "$test_results" | grep $3
    else
        echo -e "${GREEN}$1 tests passed!${RESET}"
    fi
}

function tests {
    for test in "$@" 
    do
        if [[ " ${types[*]} " =~ " ${test} " ]]; then
            run_test "Typescript $test" "deno test $test/tests" "FAILED ("
        else
            echo -e "${RED}Skipping $benchmark. NOT FOUND${RESET}"
        fi
    done
}

if [ $# -eq 0 ]; then
    tests ${types[@]}
else 
    run_test "Typescript" "deno test" "FAILED ("
fi