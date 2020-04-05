#!/bin/bash
GREEN='\033[38;5;2m'
CYAN='\033[38;5;45m'
BLUE='\033[38;5;25m'
PURPLE='\033[38;5;164m'
PURPLE2='\033[38;5;93m'
DIM='\033[38;5;243m'
RESET='\033[0m'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# install frontend dependencies
echo -e "${CYAN}Front end dependencies"
echo -e "${BLUE}Removing old dependencies . . .${DIM}"
cd $DIR/front-end
rm -rf node_modules
echo -e "${BLUE}Installing new ones . . .${DIM}"
npm install --silent

# install backend dependencies
echo -e "${PURPLE}Back end dependencies"
echo -e "${PURPLE2}Removing old dependencies . . .${DIM}"
cd $DIR/back-end
rm -rf node_modules
echo -e "${PURPLE2}Installing new ones . . .${DIM}"
npm install --silent

# build front-end dependencies
echo -e "${CYAN}Building front end . . .${DIM}"
cd $DIR/front-end
npm run build --silent

# copy info to www
echo -e "${CYAN}Deploying front end code . . .${DIM}"
cp -rf dist/* /var/www/creative4.mattrobdev.com/

# start backend server
echo -e "${PURPLE}Starting back end service . . .${DIM}"
cd $DIR/back-end
forever stop creative4 --no-colors
forever start --uid "creative4" -a server.js --no-colors

echo -e "\n${GREEN}DONE!${RESET}"