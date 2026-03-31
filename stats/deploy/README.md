## Bitsocial VPS Deploy

This deployment layout assumes the repo is synced to `/srv/bitsocial-web/current` on the VPS and that the static `dist/about` and `dist/docs` builds are already present in that checkout.

### Expected host layout

- repo checkout: `/srv/bitsocial-web/current`
- host Caddy config: `/etc/caddy/Caddyfile`
- newsletter/listmonk remains on `newsletter.bitsocial.net` via `127.0.0.1:9000`

### Syncing a release

From a local checkout that already ran `yarn build`, sync the repo and build output:

```bash
rsync -az --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.yarn' \
  --exclude '.playwright-cli' \
  --exclude '.firecrawl' \
  --exclude 'stats/monitor/scripts' \
  ./ root@HOST:/srv/bitsocial-web/current/
```

### Starting the stats stack

On the VPS:

```bash
cd /srv/bitsocial-web/current
cp stats/deploy/.env.example stats/deploy/.env
$EDITOR stats/deploy/.env
docker compose -f stats/deploy/compose.yaml up -d --build
```

### Activating Caddy

Install `stats/deploy/Caddyfile` to `/etc/caddy/Caddyfile`, then validate and reload:

```bash
caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
systemctl reload caddy
```

### Smoke checks

Before DNS cutover:

```bash
curl -H 'Host: bitsocial.net' http://127.0.0.1/
curl -H 'Host: bitsocial.net' http://127.0.0.1/docs/
curl -H 'Host: bitsocial.net' http://127.0.0.1/stats/
curl -H 'Host: bitsocial.net' http://127.0.0.1/stats/5chan
curl -fsS http://127.0.0.1:9091/api/v1/targets
```

After DNS cutover:

```bash
curl -I https://bitsocial.net/
curl -I https://bitsocial.net/docs/
curl -I https://bitsocial.net/stats/
curl -I https://bitsocial.net/stats/5chan
```
