require('dotenv').config();
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

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

const getPresignedUrl = async (imageKey) => {
    const getObjectParams = { Bucket: bucketName, Key: imageKey };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
};

module.exports.uploadFile = uploadFile;
module.exports.getPresignedUrl = getPresignedUrl;
