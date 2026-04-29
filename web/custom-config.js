// Extra server-side Jitsi Meet config appended by docker-jitsi-meet.
// Keep this file small: the main deployment settings live in docker-compose.yaml.

config.fileRecordingsEnabled = true;
config.fileRecordingsServiceEnabled = true;
config.fileRecordingsServiceSharingEnabled = true;

config.recordingService = {
  enabled: true,
  sharingEnabled: true,
  hideStorageWarning: true
};

config.recordings = {
  ...(config.recordings || {}),
  recordAudioAndVideo: true,
  suggestRecording: true,
  showPrejoinWarning: true,
  showRecordingLink: false
};

const toolbarButtonsWithRecording = [
  'microphone',
  'camera',
  'closedcaptions',
  'desktop',
  'fullscreen',
  'fodeviceselection',
  'hangup',
  'profile',
  'chat',
  'recording',
  'settings',
  'raisehand',
  'videoquality',
  'filmstrip',
  'invite',
  'feedback',
  'stats',
  'shortcuts',
  'tileview',
  'security',
  'participants-pane',
  'toggle-camera',
  'select-background'
];

config.toolbarButtons = Array.isArray(config.toolbarButtons)
  ? Array.from(new Set([...config.toolbarButtons, 'recording']))
  : toolbarButtonsWithRecording;

config.disabledSounds = ['RECORDING_ON_SOUND', 'RECORDING_OFF_SOUND'];
