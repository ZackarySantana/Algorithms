#!/bin/bash

source utils/constants.sh
source utils/languages.sh

# run_test ${Language} ${Test name} ${Test command} ${Failed keyword}
function run_test {
    echo -e "${YELLOW}Running $1 ${RESET}$2${YELLOW} tests${RESET}"
    if test_results=$($3 2>&1) ; then
        # Succeeded
        if [ $verbose -eq 1 ]; then
            echo "${test_results}"
        fi
        echo -e "${GREEN}$1 ${RESET}$2${GREEN} tests passed!${RESET}\n"
    else
        # Failed
        echo -e ${line}
        echo -e "$test_results" | grep -C 6 -i --group-separator=$'\n\033[1;34m==============================\033[0;0m\n' $4
        echo -e "${line}"
        echo -e "${RED}$1 ${RESET}$2${RED} test failed${RESET}"
    fi
}

function tests {
    for test in "$@" 
    do
        if [[ " ${types[*]} " =~ " ${test} " ]]; then
            if [ $all -eq 1 ] || [ $typescript -eq 1 ]; then
                run_test "Typescript" "${test}" "deno test ${test}/tests" "failed"
            fi
            if [ $all -eq 1 ] || [ $java -eq 1 ]; then
            java_files="find ${test} -name "*.java""
                if [ -n "$($java_files)" ]; then
                    if java_compile=$($java_files | xargs javac 2>&1); then
                        run_test "Java" "${test}" "java ${test}.tests.Java" "failed"
                    else
                        echo "${java_compile}"
                        echo -e "${RED}Java ${RESET}${test}${RED} compile failed${RESET}"
                    fi
                else
                    echo -e "${RED}NOT FOUND \"${test}.tests.Java\": Skipping${RESET}"
                fi
            fi
        else
            echo -e "${RED}NOT FOUND \"${test}\": Skipping${RESET}"
        fi
    done
}

if [ $# -eq 0 ]; then
    tests ${types[@]}
else
    tests $@
fi