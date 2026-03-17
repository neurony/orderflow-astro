#!/bin/bash

set -e

# Use environment variable or fall back to staging path
DEPLOY_PATH="${DEPLOY_PATH:-/home/neurony/www-orderflow.staging.neurony.dev}"
ENVIRONMENT="${ENVIRONMENT:-staging}"
REPO_URL="git@github.com:neurony/orderflow-astro.git"
BRANCH="main"
KEEP_RELEASES=5
NODE_VERSION="20"
SERVICE_NAME="orderflow-biz"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Starting deployment...${NC}"
cd "$DEPLOY_PATH"

mkdir -p releases

RELEASE=$(date +%s)
RELEASE_PATH="$DEPLOY_PATH/releases/$RELEASE"

echo -e "${YELLOW}Creating new release: $RELEASE${NC}"
mkdir -p "$RELEASE_PATH"

echo -e "${YELLOW}Cloning repository...${NC}"
git clone --depth=1 --branch "$BRANCH" "$REPO_URL" "$RELEASE_PATH"

cd "$RELEASE_PATH"

rm -rf .git

echo -e "${YELLOW}Creating symlinks to shared resources...${NC}"

if [ -f "$DEPLOY_PATH/.env" ]; then
    ln -sf "$DEPLOY_PATH/.env" "$RELEASE_PATH/.env"
else
    echo -e "${RED}Warning: .env file not found at $DEPLOY_PATH/.env${NC}"
    echo -e "${RED}Please create it before running the application${NC}"
fi

echo -e "${YELLOW}Installing dependencies...${NC}"
cd "$RELEASE_PATH"
npm ci --omit=dev

echo -e "${YELLOW}Building site...${NC}"
npm run build

echo -e "${YELLOW}Updating current symlink...${NC}"
cd "$DEPLOY_PATH"
[[ -L current ]] && cp -PT current previous
ln -sfn "$RELEASE_PATH" current

echo -e "${YELLOW}Restarting application...${NC}"
sudo systemctl restart "$SERVICE_NAME"

echo -e "${YELLOW}Cleaning up old releases...${NC}"
cd "$DEPLOY_PATH/releases"
ls -t | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}Current release: $RELEASE${NC}"

echo -e "${YELLOW}Available releases for rollback:${NC}"
ls -t "$DEPLOY_PATH/releases" | head -n "$KEEP_RELEASES"
