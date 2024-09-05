import {postRestS3} from '../../models/client';
import {imageDataType, IMAGE_TYPE} from '../../types/imageType';
import {deleteImageS3, getImageS3, putImageS3} from '../../utils/awsHelper';
import uuid from 'react-native-uuid';

const uriToBlob = (uri: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // If successful -> return with blob
    xhr.onload = function () {
      resolve(xhr.response);
    };

    // reject on error
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'));
    };

    // Set the response type to 'blob' - this means the server's response
    // will be accessed as a binary object
    xhr.responseType = 'blob';

    // Initialize the request. The third argument set to 'true' denotes
    // that the request is asynchronous
    xhr.open('GET', uri, true);

    // Send the request. The 'null' argument means that no body content is given for the request
    xhr.send(null);
  });
};

export const uploadImage = async (image: {
  imageData: imageDataType;
  imageType: IMAGE_TYPE;
}): Promise<{imageUrl: string}> => {
  return new Promise(async function (resolve, reject) {
    const fileId = uuid.v4().toString();
    if (fileId) {
      const url = await putImageS3(fileId, image.imageType);
      const blob = await uriToBlob(image.imageData.uri || '');
      const response = await postRestS3(blob, url);

      if (response.status === 200) {
        resolve({imageUrl: fileId});
      }
    }
    reject({imageUrl: null});
  });
};

export const downloadImage = async (image: {
  imageId: string;
  imageType: IMAGE_TYPE;
}) => {
  const imageUrl = await getImageS3(image.imageId, image.imageType);

  return {imageUrl};
};

export const deleteImage = async (imageUrl: string, imageType: IMAGE_TYPE) => {
  const isDeleted = await deleteImageS3(imageUrl, imageType);

  return {isDeleted};
};
