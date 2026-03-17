#!/bin/bash

set -e

DEPLOY_PATH="${DEPLOY_PATH:-/home/neurony/www-orderflow.staging.neurony.dev}"
SERVICE_NAME="orderflow-biz"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}Starting rollback...${NC}"

cd "$DEPLOY_PATH"

# Check if previous symlink exists
if [[ ! -L previous ]]; then
    echo -e "${RED}Error: No previous release found to rollback to${NC}"
    exit 1
fi

# Get release names for display
CURRENT_RELEASE=$(readlink current | xargs basename)
PREVIOUS_RELEASE=$(readlink previous | xargs basename)

echo -e "${YELLOW}Current release: $CURRENT_RELEASE${NC}"
echo -e "${YELLOW}Rolling back to: $PREVIOUS_RELEASE${NC}"

# Swap current and previous symlinks
TEMP_CURRENT=$(readlink current)
cp -PT previous current
ln -sfn "$TEMP_CURRENT" previous

# Restart the application
echo -e "${YELLOW}Restarting application...${NC}"
sudo systemctl restart "$SERVICE_NAME"

echo -e "${GREEN}Rollback completed successfully!${NC}"
echo -e "${GREEN}Now running: $PREVIOUS_RELEASE${NC}"

# Show available releases
echo -e "${YELLOW}Available releases:${NC}"
ls -t "$DEPLOY_PATH/releases" | head -n 5
