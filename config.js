module.exports = {
  SOURCE_MAP_PATH: process.env.SOURCE_MAP_PATH || './KeweSL.app.dSYM',
  CRASH_FILE: process.env.CRASH_FILE || './crash.crash',
  MAC_DEVELOPER_DIR: process.env.MAC_DEVELOPER_DIR || '/Applications/Xcode.app/Contents/Developer',
  SYMBOLICATECRASH_SCRIPT_PATH: process.env.SYMBOLICATECRASH_SCRIPT_PATH || '/Applications/Xcode.app/Contents/SharedFrameworks/DVTFoundation.framework/Versions/A/Resources/symbolicatecrash',
  SYMBOLICATE_QUEUE_NAME: process.env.SYMBOLICATE_QUEUE_NAME || 'symbolicate-queue',
  SQS_ENDPOINT: process.env.SQS_ENDPOINT || 'http://localhost:9324',
  SQS_REGION: process.env.SQS_REGION || 'some-region',
}