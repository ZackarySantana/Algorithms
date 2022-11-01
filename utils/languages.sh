#!/bin/bash

all=1
typescript=0
java=0

data_filename="data.json"
output="benchmark_results"
output_to_console=0

options=""

if [[ $0 == *"test"* ]]; then
    options=":l:"
elif [[ $0 == *"benchmark"* ]]; then
    options=":l:n:o:c"
elif [[ $0 == *"cdata"* ]]; then
    options=":o:"
fi

while getopts $options opt; do
    case $opt in
        l)
            if [[ $0 == *"test"* ]]; then
                echo -e "${YELLOW}Only testing with languages: '$OPTARG'${RESET}"
            elif [[ $0 == *"benchmark"* ]]; then
                echo -e "${YELLOW}Only benchmarking with languages: '$OPTARG'${RESET}"
            fi
            all=0
            for i in $OPTARG; do
                if [ ${i,,} = "typescript" ]; then
                    typescript=1
                elif [ ${i,,} = "java" ]; then
                    java=1
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
            elif [[ $0 == *"cdata"* ]]; then
                echo -e "${YELLOW}Printing to data file: '$OPTARG'${RESET}"
            fi
            output=$OPTARG
        ;;
        c)
            output_to_console=1
        ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
        ;;
    esac
done

shift $(($OPTIND - 1))