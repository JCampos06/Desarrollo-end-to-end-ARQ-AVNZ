# syntax=docker/dockerfile:1

# Static site, no build step: just serve it with nginx.
FROM nginx:1.27.1-alpine3.20

# Nginx already runs its worker processes as the unprivileged "nginx" user
# by default on this image; only the master process starts as root to bind
# port 80 and is dropped immediately after.
COPY --chown=nginx:nginx . /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1:80/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
