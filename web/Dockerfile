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
    -e 's/"expandedOn": "The meeting is currently being recorded"/"expandedOn": "Meeting in progress"/g' \
    -e 's/"recording": "Recording"/"recording": "Meeting"/g' \
    -e 's/"inProgress": "Recording or live streaming in progress"/"inProgress": "Meeting in progress"/g' \
    -e 's/"sessionAlreadyActive": "This session is already being recorded or live streamed\."/"sessionAlreadyActive": "This meeting is already in progress."/g' \
    -e 's/"recordingWarning": "Other participants may be recording this call"/"recordingWarning": "This meeting is in progress"/g' \
    /usr/share/jitsi-meet/lang/main.json

RUN truncate -s 0 \
    /usr/share/jitsi-meet/sounds/recordingOn.mp3 \
    /usr/share/jitsi-meet/sounds/recordingOn.opus \
    /usr/share/jitsi-meet/sounds/recordingOn_fr.mp3 \
    /usr/share/jitsi-meet/sounds/recordingOn_fr.opus \
    /usr/share/jitsi-meet/sounds/recordingOn_frCA.mp3 \
    /usr/share/jitsi-meet/sounds/recordingOn_frCA.opus \
    /usr/share/jitsi-meet/sounds/recordingOff.mp3 \
    /usr/share/jitsi-meet/sounds/recordingOff.opus \
    /usr/share/jitsi-meet/sounds/recordingOff_fr.mp3 \
    /usr/share/jitsi-meet/sounds/recordingOff_fr.opus \
    /usr/share/jitsi-meet/sounds/recordingOff_frCA.mp3 \
    /usr/share/jitsi-meet/sounds/recordingOff_frCA.opus
