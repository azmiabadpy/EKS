const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1"
});

function logInfo(message) {
  const timestamp = new Date().toISOString();

  const logMessage = `[${timestamp}] INFO: ${message}`;

  console.log(logMessage);

  return logMessage;
}

async function uploadLogToS3(logMessage) {
  if (!process.env.S3_BUCKET_NAME) {
    console.log("S3_BUCKET_NAME is not configured. Log stored in console only.");
    return;
  }

  const timestamp = new Date();
  const date = timestamp.toISOString().split("T")[0];

  const key = `application-logs/${date}/${Date.now()}.log`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: logMessage,
    ContentType: "text/plain"
  });

  await s3Client.send(command);

  console.log(`Log uploaded to S3: ${key}`);
}

module.exports = {
  logInfo,
  uploadLogToS3
};
