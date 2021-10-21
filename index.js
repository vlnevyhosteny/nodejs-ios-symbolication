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
const aws = require('aws-sdk');

async function produceMessage(MessageBody) {
  const sqs = new aws.SQS({
    endpoint: config.SQS_ENDPOINT,
    region: config.SQS_REGION,
  });

  const queueUrl = await sqs.getQueueUrl({
    QueueName: config.SYMBOLICATE_QUEUE_NAME,
  }).promise();

  return sqs.sendMessage({
    QueueUrl: queueUrl.QueueUrl,
    MessageBody,
  }).promise()
}

app.get("/symbolicate", async (req, res, next) => {
  const result = await symbolicate(config.SOURCE_MAP_PATH, config.CRASH_FILE)

  await produceMessage(result.stdout);

  res.json(result);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
