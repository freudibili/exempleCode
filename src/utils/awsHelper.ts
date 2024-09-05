import S3 from 'aws-sdk/clients/s3';
import {Credentials} from 'aws-sdk';
import config from './config';
import {IMAGE_TYPE} from '../types/imageType';

export enum IMAGES3 {
  PREFIX_TROC_ITEM_IMAGE = 'images/trocItems/',
  PREFIX_USER_IMAGE = 'images/users/',
  SUFFIX = '.jpg',
}

const access = new Credentials({
  accessKeyId: config.AWS_KEY_ID as string,
  secretAccessKey: config.AWS_SECRET as string,
});

const s3 = new S3({
  credentials: access,
  region: config.S3_REGION,
  signatureVersion: 'v4',
});

const getPrefix = (imageType: IMAGE_TYPE) => {
  switch (imageType) {
    case IMAGE_TYPE.TROC_ITEM: {
      return IMAGES3.PREFIX_TROC_ITEM_IMAGE;
    }
    case IMAGE_TYPE.USER: {
      return IMAGES3.PREFIX_USER_IMAGE;
    }
    default:
      return '';
  }
};

export const putImageS3 = async (fileId: string, imageType: IMAGE_TYPE) => {
  const signedUrlExpireSeconds = 60 * 60 * 24 * 7; // 7 days wich is the maximum

  const uploadURL = await s3.getSignedUrlPromise('putObject', {
    Bucket: config.S3_BUCKET,
    Key: getPrefix(imageType) + fileId + IMAGES3.SUFFIX,
    ContentType: 'image/jpeg',
    Expires: signedUrlExpireSeconds,
  });

  return uploadURL;
};

export const getImageS3 = async (key: string, imageType: IMAGE_TYPE) => {
  const url = await s3.getSignedUrlPromise('getObject', {
    Bucket: config.S3_BUCKET,
    Key: getPrefix(imageType) + key + IMAGES3.SUFFIX,
  });

  return url;
};

export const deleteImageS3 = async (key: string, imageType: IMAGE_TYPE) => {
  s3.deleteObject(
    {
      Bucket: config.S3_BUCKET,
      Key: getPrefix(imageType) + key + IMAGES3.SUFFIX,
    },
    function (err) {
      if (err) {
        return false;
      } else {
        return true;
      }
    },
  );
};

export const extratS3Id = (imageUrl: string, imageType: IMAGE_TYPE) => {
  return imageUrl
    .replace(config.S3_URL + getPrefix(imageType), '')
    .split('.jpg')[0];
};
