const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
//const dotenv = require('dotenv');
//const AWS = require("aws-sdk");
//dotenv.config();

//const credentials = new aws.SharedIniFileCredentials({profile: 'ananya'});
//aws.config.credentials = credentials;

console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);

aws.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

console.log(aws.config.credentials)

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'vasi-aws-training',
    key: function(req, file, cb) {
      req.file = Date.now() + file.originalname;
      cb(null, Date.now() + file.originalname);
    }
  })
});

module.exports = upload;
