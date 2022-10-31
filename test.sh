# Black        0;30     Dark Gray     1;30
# Red          0;31     Light Red     1;31
# Green        0;32     Light Green   1;32
# Brown/Orange 0;33     Yellow        1;33
# Blue         0;34     Light Blue    1;34
# Purple       0;35     Light Purple  1;35
# Cyan         0;36     Light Cyan    1;36
# Light Gray   0;37     White         1;37
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;33m'
YELLOW='\033[1;33m'
RESET='\033[0;0m'

echo -e "${YELLOW}Running Typescript tests${RESET}"
typescript_test=$(deno test)
if [[ $typescript_test == *"FAILED ("* ]]; then
  echo -e "${RED}Typescript test failed: ${RESET}"

  echo -e "$typescript_test" | grep FAILED
else
    echo -e "${GREEN}Typescript tests passed!${RESET}"
fi