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
        echo -e "${RED}$1 ${RESET}$2${RED} test failed${RESET}\n"
    fi
}

function file_exists {
    if [ -f "${1}" ]; then
        return 0
    else
        echo -e "${RED}NOT FOUND \"${1}\": Skipping${RESET}\n"
        return 1
    fi
}

function compile {
    if compile_text=$(${1} 2>&1); then
        return 0
    else
        echo "${java_compile}"
        echo -e "${RED}Java ${RESET}${1}${RED} compile failed${RESET}\n"
        return 1
    fi
}

function typescript_test {
    if [ $all -eq 1 ] || [ $typescript -eq 1 ]; then
        if file_exists "${1}/tests/typescript.test.ts"; then
            run_test "Typescript" "${1}" "deno test ${1}/tests" "failed"
        fi
    fi
}

function java_test {
    if [ $all -eq 1 ] || [ $java -eq 1 ]; then
        if file_exists "${1}/tests/Java.java"; then
            if compile "javac ${1}/tests/Java.java"; then
                run_test "Java" "${1}" "java ${1}.tests.Java" "failed"
                class_files="find ${1} -name "*.class""
                $class_files | xargs rm -f
            fi
        fi
    fi
}

function fsharp_test {
    if [ $all -eq 1 ] || [ $fsharp -eq 1 ]; then
        if file_exists "${1}/tests/f#.test.fsx"; then
            run_test "F#" "${test}" "dotnet fsi ${test}/tests/f#.test.fsx" "failed"
        fi
    fi
}

function tests {
    for test in "$@" 
    do
        if [[ " ${types[*]} " =~ " ${test} " ]]; then
            typescript_test $test
            java_test $test
            fsharp_test $test
        else
            echo -e "${RED}NOT FOUND \"${test}\": Skipping${RESET}\n"
        fi
    done
}

if [ $# -eq 0 ]; then
    tests ${types[@]}
else
    tests $@
fi