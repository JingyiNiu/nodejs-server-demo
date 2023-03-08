require('dotenv').config();
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');

const bucketName = process.env.AWS_S3_BUCKET_NAME;
const bucketRegion = process.env.AWS_S3_BUCKET_REGION;
const accessKeyId = process.env.AWS_BUCKET_MANAGER_ACCESS_KEY;
const secretAccessKey = process.env.AWS_BUCKET_MANAGER_SECRET_KEY;

const s3Client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

function uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
    };

    return s3Client.send(new PutObjectCommand(uploadParams));
}

module.exports.uploadFile = uploadFile;
