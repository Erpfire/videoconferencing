#!/usr/bin/env bash
set -euo pipefail

for key in \
  JICOFO_AUTH_PASSWORD \
  JVB_AUTH_PASSWORD \
  JIBRI_RECORDER_PASSWORD \
  JIBRI_XMPP_PASSWORD
do
  value="$(openssl rand -hex 32)"
  printf '%s=%s\n' "$key" "$value"
done
