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

# ${File name}
function file_exists {
    if [ -f "${1}" ]; then
        return 0
    else
        echo -e "${RED}NOT FOUND \"${1}\": Skipping${RESET}\n"
        return 1
    fi
}

# ${Language} ${File name}
function compile {
    if compile_text=$(${2} 2>&1); then
        return 0
    else
        echo "${compile_text}"
        echo -e "${RED}${1} ${RESET}${2}${RED} compile failed${RESET}\n"
        return 1
    fi
}

# ${Test}
function typescript_test {
    if [ $typescript -eq 1 ]; then
        if file_exists "${1}/tests/typescript.test.ts"; then
            run_test "Typescript" "${1}" "deno test ${1}/tests" "failed"
        fi
    fi
}

# ${Test}
function java_test {
    if [ $java -eq 1 ]; then
        if file_exists "${1}/tests/Java.java"; then
            if compile "Java" "javac ${1}/tests/Java.java"; then
                run_test "Java" "${1}" "java ${1}.tests.Java" "failed"
                find ${1} -name "*.class" | xargs rm -f
            fi
        fi
    fi
}

# ${Test}
function fsharp_test {
    if [ $fsharp -eq 1 ]; then
        if file_exists "${1}/tests/f#.test.fsx"; then
            run_test "F#" "${test}" "dotnet fsi ${test}/tests/f#.test.fsx" "failed"
        fi
    fi
}

# ${List of tests}
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