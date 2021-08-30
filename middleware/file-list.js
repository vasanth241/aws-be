const aws = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'us-east-1'
});

const s3 = new aws.S3();

const list = (req, res) => {
    s3.listObjects({Bucket : 'vasi-aws-training'}, (err, data) => {
    if (err) {
        console.log("Error", err);
    } else {
        res.send(data['Contents'])
    }
})
}
  
module.exports = list;
