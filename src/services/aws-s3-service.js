const config = require('../config');

const AWS = require('aws-sdk');

exports.uploadToS3 = (file) => {
    let s3bucket = new AWS.S3({
        accessKeyId: config.awsBucket.iamUserKey,
        secretAccessKey: config.awsBucket.iamUserSecret,
        Bucket: config.awsBucket.bucketName
    });
    s3bucket.createBucket(function () {
        var params = {
            Bucket: config.awsBucket.bucketName,
            Key: file.name,
            Body: file.buffer
        };
        s3bucket.upload(params, function (err, data) {
            if (err) {
                console.log('error in callback');
                console.log(err);
            }
            console.log('success');
            console.log(data);
        });
    });
}
