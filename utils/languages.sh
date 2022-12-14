#!/bin/bash

typescript=1
java=1
fsharp=1

data_filename="data.json"
output_benchmark="benchmark_results"
output_data="data.json"
output_to_console=0
verbose=0
hide_notfound=0
hide_compilefailed=0

options=""

if [[ $0 == *"test"* ]]; then
    options=":l:vhc"
elif [[ $0 == *"benchmark"* ]]; then
    options=":l:n:o:c"
elif [[ $0 == *"cdata"* ]]; then
    options=":o:"
fi

while getopts $options opt; do
    case $opt in
        l)
            typescript=0
            java=0
            fsharp=0
            for i in $OPTARG; do
                if [ ${i,,} = "typescript" ] || [ ${i,,} = "ts" ]; then
                    typescript=1
                elif [ ${i,,} = "java" ]; then
                    java=1
                elif [ ${i,,} = "fsharp" ] || [ ${i,,} = "f#" ]; then
                    fsharp=1
                fi
            done
        ;;
        n)
            echo -e "${YELLOW}Using data file: '$OPTARG'${RESET}"
            data_filename=$OPTARG
        ;;
        o)
            if [[ $0 == *"benchmark"* ]]; then
                echo -e "${YELLOW}Outputting to folder: '$OPTARG'${RESET}"
                output_benchmark=$OPTARG
            elif [[ $0 == *"cdata"* ]]; then
                echo -e "${YELLOW}Printing to data file: '$OPTARG'${RESET}"
                output_data=$OPTARG
            fi
        ;;
        c)
            if [[ $0 == *"benchmark"* ]]; then
                output_to_console=1
            elif [[ $0 == *"test"* ]]; then
                hide_compilefailed=1
            fi
        ;;
        v)
            verbose=1
        ;;
        h)
            hide_notfound=1
        ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
        ;;
    esac
done
shift $(($OPTIND - 1))

if ! command -v deno &> /dev/null; then 
    typescript=0
    echo -e "${RED}Deno cannot be found, please install it here: https://deno.land/${RESET}"
fi

if ! command -v javac &> /dev/null || ! command -v java &> /dev/null; then 
    java=0
    echo -e "${RED}Java cannot be found, please install it here: https://www.java.com/en/download/manual.jsp${RESET}"
fi

if ! command -v dotnet &> /dev/null; then 
    fsharp=0
    echo -e "${RED}Dotnet cannot be found, please install it here: https://dotnet.microsoft.com/en-us/download${RESET}"
    echo -e "${RED}Skipping F#${RESET}"
fi