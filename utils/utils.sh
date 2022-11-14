# ${Language/Benchmark} ${File name}
function file_exists {
    if [ -f "${2}" ]; then
        return 0
    else
        if [ $hide_notfound -eq 0 ]; then
            echo -e "  ${RED}$1 failed. Not found file \"${2}\"${RESET}"
        fi
        return 1
    fi
}

# ${Language/Benchmark} ${File name}
function compile {
    if compile_text=$(${2} 2>&1); then
        return 0
    else
        if [ $hide_compilefailed -eq 0 ]; then
            echo "${compile_text}"
            echo -e "  ${RED}${1} failed. Compile failed \"${2}\"${RESET}"
        fi
        return 1
    fi
}