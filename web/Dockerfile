FROM jitsi/web:stable-10888

RUN mkdir -p /usr/share/jitsi-meet/static/live-meeting

COPY live-meeting.html /usr/share/jitsi-meet/static/live-meeting.html
COPY live-meeting.html /usr/share/jitsi-meet/static/live-meeting/index.html
COPY custom-config.js /defaults/custom-config.local.js
COPY copy-custom-config.sh /etc/cont-init.d/09-copy-custom-config

RUN chmod +x /etc/cont-init.d/09-copy-custom-config

RUN sed -i \
    -e 's/"recording": "This meeting is being recorded\."/"recording": "Connected with server"/g' \
    -e 's/"onBy": "{{name}} started the recording"/"onBy": "{{name}} started video conferencing"/g' \
    -e 's/"expandedOn": "The meeting is currently being recorded"/"expandedOn": "meeting is in progress"/g' \
    /usr/share/jitsi-meet/lang/main.json
