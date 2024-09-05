import {Platform} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
  CameraOptions,
  MediaType,
} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const imageOptions = {
  mediaType: 'photo' as MediaType,
  maxHeight: 1000,
  maxWidth: 1000,
};
const startCamera = async () => {
  let options: CameraOptions = imageOptions;

  return await launchCamera(options);
};

const openImageLibrary = async () => {
  let options: ImageLibraryOptions = imageOptions;

  return await launchImageLibrary(options);
};

const pickImage = async (source: 'camera' | 'library') => {
  return new Promise(async function (resolve, reject) {
    var response: ImagePickerResponse;
    if (source === 'library') {
      response = await openImageLibrary();
    } else {
      response = await startCamera();
    }
    const {assets} = response;
    if (assets) {
      const image = assets[0];
      let data = {
        name: image.fileName,
        type: image.type,
        uri:
          Platform.OS === 'android'
            ? image.uri
            : image.uri?.replace('file://', ''),
      };

      if (data.uri) {
        resolve(data);
      }
    }
    reject();
  });
};

export const convertImageToBase64 = async (imagePath: string) => {
  try {
    // Read the image file as a base64 string
    const imageBase64 = await RNFS.readFile(imagePath, 'base64');

    return imageBase64;
    // Now you have the Base64 encoded image data in the 'imageBase64' variable
  } catch (error) {
    return undefined;
  }
};

export {startCamera, openImageLibrary, pickImage};
