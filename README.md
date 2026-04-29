# Jitsi Meet + Jibri for Coolify

## Problem Statement

The client needs a self-hosted video conferencing server on an existing VPS that already runs Coolify. The expected usage is small and time-bound: up to 8 connected sites/devices joining a single meeting for roughly one hour. The session must be recorded and stored on the VPS so it can be reviewed or delivered later.

The server available for this deployment has enough capacity for this workload:

- 8 CPU
- 32 GB RAM
- 400 GB storage
- Public IP: `72.61.233.6`
- Domain: `meet.freiza.cloud`
- Coolify with Traefik already handling ports `80` and `443`

The main requirement is not a large public conferencing platform like Zoom. The goal is a controlled, private meeting system where an admin/moderator starts the room, the remote sites join as guests, and the whole meeting is recorded as one combined video. For this use case, one combined recording is preferred over 8 separate recordings because it is simpler, easier to operate, and matches the normal Jitsi/Jibri recording model.

This project solves the deployment problem by packaging the official Jitsi Docker services into a Coolify-friendly Docker Compose stack. A single Dockerfile is not the right shape for this service because Jitsi Meet with recording is not one process. It needs multiple cooperating containers:

- `web` serves the Jitsi Meet browser interface.
- `prosody` provides the XMPP messaging layer.
- `jicofo` manages conference focus and room control.
- `jvb` handles audio/video media over UDP `10000`.
- `jibri` joins the meeting as a recorder and writes the recording to a Docker volume.

Coolify/Traefik terminates HTTPS for the web interface, while the Jitsi Video Bridge still exposes UDP `10000` directly because WebRTC media should not be proxied through normal HTTP routing. Recording output is stored in a persistent Docker volume so it survives container restarts and can be retrieved after the event.

The intended access model is:

- Only an admin/moderator account can create or start rooms.
- Guest devices can join after the room exists.
- Recording is started by the admin/moderator.
- The final recording is stored in the `jitsi-recordings` volume.

This setup is designed for the described one-hour, small-group event. It is not intended to be a high-scale public meeting platform, a webinar product, or an 8-camera surveillance/NVR system with separate isolated recordings per site.

## Deployment Summary

This repo deploys a self-hosted Jitsi Meet server with one Jibri recorder for:

- Domain: `meet.freiza.cloud`
- VPS IP: `72.61.233.6`
- Recording mode: one combined meeting recording
- HTTPS: handled by Coolify Traefik
- WebRTC media: direct UDP `10000`

Jitsi is not a single-container app, so this uses `docker-compose.yaml` instead of a Dockerfile.

## Coolify Deployment

1. Push this repository to GitHub.
2. In Coolify, create a new Docker Compose resource from the GitHub repo.
3. Use `docker-compose.yaml`.
4. Add the environment variables from `.env.example`.
5. Replace the four password values with generated values.
6. Deploy.

Generate passwords locally:

```bash
./scripts/generate-passwords.sh
```

Required DNS:

```text
meet.freiza.cloud A 72.61.233.6
```

Required open ports:

```text
80/tcp
443/tcp
10000/udp
```

Only the `web` service is exposed through Traefik. `prosody`, `jicofo`, `jvb`, and `jibri` stay internal, except `jvb` publishes UDP `10000`.

## Create Admin User

After the stack is deployed, create a moderator user inside the Prosody container:

```bash
docker ps --format "table {{.Names}}\t{{.Image}}" | grep jitsi/prosody
docker exec -it <prosody-container-name> prosodyctl --config /config/prosody.cfg.lua register admin meet.jitsi 'choose-a-strong-admin-password'
```

Use this admin login to create/start rooms. Guest devices can join after the room is started.

## Test Before Event

1. Open `https://meet.freiza.cloud/test`.
2. Log in as `admin`.
3. Join from two or three devices.
4. Start recording.
5. Stop after a few minutes.
6. Check the Coolify volume ending in `jitsi-recordings`.

For the real event, start the room as `admin`, start recording automatically, then let the 8 site devices join.
