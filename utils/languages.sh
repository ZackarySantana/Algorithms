#!/bin/bash

all=1
typescript=0
java=0

data_filename="data.json"
output_folder="benchmark_results"

options=""

if [[ $0 == *"test"* ]]; then
    options=":l:"
elif [[ $0 == *"benchmark"* ]]; then
    options=":l:n:o:"
elif [[ $0 == *"cdata"* ]]; then
    options=":n:"
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
            if [[ $0 == *"benchmark"* ]]; then
                echo -e "${YELLOW}Using data file: '$OPTARG'${RESET}"
            elif [[ $0 == *"cdata"* ]]; then
                echo -e "${YELLOW}Printing to data file: '$OPTARG'${RESET}"
            fi
            data_filename=$OPTARG
        ;;
        o)
            echo -e "${YELLOW}Outputting to folder: '$OPTARG'${RESET}"
            output_folder=$OPTARG
        ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
        ;;
    esac
done

shift $(($OPTIND - 1))