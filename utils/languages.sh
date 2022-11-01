#!/bin/bash

all=1
typescript=0
java=0

data_filename="data.json"

while getopts ":l:n:" opt; do
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
        n)
            echo -e "${YELLOW}Using file: '$OPTARG'${RESET}"
            data_filename=$OPTARG
        ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
        ;;
    esac
done

shift $(($OPTIND - 1))