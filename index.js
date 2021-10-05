const util = require('util');
const exec = util.promisify(require('child_process').exec);
const config = require('./config');

function composeExecCommand(sourceMap, crash) {
  return `${config.SYMBOLICATECRASH_SCRIPT_PATH} --dsym=${sourceMap} ${crash}`;
}

async function symbolicate(sourceMap, crash) {
  try {
    return await exec(
      composeExecCommand(sourceMap, crash),
      {
        env: {
          DEVELOPER_DIR: config.MAC_DEVELOPER_DIR,
        },
      },
    );
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

const express = require('express');
const app = express();

app.get("/symbolicate", async (req, res, next) => {
  const result = await symbolicate(config.SOURCE_MAP_PATH, config.CRASH_FILE)

  res.json(result);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
