FROM jitsi/web:stable-10888

RUN mkdir -p /usr/share/jitsi-meet/static/auto-record

COPY auto-record.html /usr/share/jitsi-meet/static/auto-record.html
COPY auto-record.html /usr/share/jitsi-meet/static/auto-record/index.html
COPY custom-config.js /defaults/custom-config.local.js
COPY copy-custom-config.sh /etc/cont-init.d/09-copy-custom-config

RUN chmod +x /etc/cont-init.d/09-copy-custom-config
