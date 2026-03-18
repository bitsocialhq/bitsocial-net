#!/bin/bash

repo_root="$(cd "$(dirname "$0")/../.." && pwd)"
exec "$repo_root/scripts/agent-hooks/bun-install.sh" "$@"
