const util = require('util');
const exec = util.promisify(require('child_process').exec);

const SOURCE_MAP_PATH = './KeweSL.app.dSYM';
const CRASH_FILE = './fcrash.crash';
const MAC_DEVELOPER_DIR = '/Applications/Xcode.app/Contents/Developer'
const SYMBOLICATECRASH_SCRIPT_PATH = '/Applications/Xcode.app/Contents/SharedFrameworks/DVTFoundation.framework/Versions/A/Resources/symbolicatecrash'

function composeExecCommand(sourceMap, crash) {
  return `${SYMBOLICATECRASH_SCRIPT_PATH} --dsym=${sourceMap} ${crash}`
}

async function symbolicate(sourceMap, crash) {
  try {
    return await exec(
      composeExecCommand(sourceMap, crash),
      {
        env: {
          DEVELOPER_DIR: MAC_DEVELOPER_DIR,
        },
      },
    );
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

symbolicate(SOURCE_MAP_PATH, CRASH_FILE).then((result) => {
  console.log(result)
})
