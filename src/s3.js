import { S3 } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const region = process.env.REACT_APP_REGION;
const bucketName = process.env.REACT_APP_BUCKET_NAME;
const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export const generateUploadUrl = (file) => {
  const ext = file.type.split("/")[1];
  const imageName = uuidv4() + "." + ext;
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
    ContentType: file.type,
  };
  const uploadUrl = s3.getSignedUrl("putObject", params);
  return uploadUrl;
};

export const uploadImage = async (file) => {
  if (!(file instanceof Object)) {
    return null;
  }
  const s3url = generateUploadUrl(file);
  await axios.put(s3url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  const imageUrl = s3url.split("?")[0];
  return imageUrl;
};
