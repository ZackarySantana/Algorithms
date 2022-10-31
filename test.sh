#!/bin/bash

source utils/constants.sh

# run_test ${Language} ${Test name} ${Test command} ${Failed keyword}
function run_test {
    echo -e "${YELLOW}Running $1 ${RESET}$2${YELLOW} tests${RESET}"
    test_results=$($3)
    if [[ $test_results == *"$4 ("* ]]; then
      echo -e "${RED}$1 test failed: ${RESET}"
      echo -e "$test_results" | grep $4
      echo ""
    else
        echo -e "${GREEN}$1 ${RESET}$2${GREEN} tests passed!${RESET}\n"
    fi
}

all=1
typescript=0
java=0

function tests {
    for test in "$@" 
    do
        if [[ " ${types[*]} " =~ " ${test} " ]]; then
            if [ $all -eq 1 ] || [ $typescript -eq 1 ]; then
                run_test "Typescript" "${test}" "deno test ${test}/tests" "FAILED ("
            fi
        else
            echo -e "${RED}NOT FOUND: Skipping ${test}.${RESET}"
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
    tests ${types[@]}
else
    tests $@
fi