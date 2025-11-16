#!/usr/bin/env bash
set -eo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
DEFAULT_PORT=4000

# Attempt to determine the active local IP address.
get_ip() {
  if command -v ipconfig >/dev/null 2>&1; then
    for iface in en0 en1 en2; do
      ip=$(ipconfig getifaddr "$iface" 2>/dev/null || true)
      if [[ -n "${ip}" ]]; then
        echo "$ip"
        return 0
      fi
    done
  fi

  if command -v hostname >/dev/null 2>&1; then
    hostname -I 2>/dev/null | awk '{print $1}'
    return 0
  fi

  if command -v ip >/dev/null 2>&1; then
    ip -4 addr show scope global | awk '/inet / {print $2}' | cut -d/ -f1 | head -n1
    return 0
  fi

  echo "" # fallback
}

IP_OVERRIDE="${1-}"
PORT_OVERRIDE="${2-}"

if [[ -n "$IP_OVERRIDE" && "$IP_OVERRIDE" =~ ^[0-9]+$ ]]; then
  # If only a port was provided without IP
  PORT_OVERRIDE="$IP_OVERRIDE"
  IP_OVERRIDE=""
fi

if [[ -n "$IP_OVERRIDE" ]]; then
  IP_ADDRESS="$IP_OVERRIDE"
else
  IP_ADDRESS="$(get_ip)"
fi

if [[ -z "$IP_ADDRESS" ]]; then
  echo "Could not determine local IP address."
  echo "Please specify manually: ./update-ip.sh <IP> [PORT]"
  exit 1
fi

if [[ -n "$PORT_OVERRIDE" ]]; then
  PORT="$PORT_OVERRIDE"
else
  PORT="$DEFAULT_PORT"
fi

API_URL="http://${IP_ADDRESS}:${PORT}"

ENV_FILE="${PROJECT_ROOT}/qr-attendance-app/.env.local"
cat <<EOF >"${ENV_FILE}"
EXPO_PUBLIC_API_URL=${API_URL}
EOF

echo "Set EXPO_PUBLIC_API_URL to ${API_URL} in ${ENV_FILE}"
