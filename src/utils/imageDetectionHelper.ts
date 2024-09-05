import {getLocales} from 'react-native-localize';
import {getCategoryItems} from '../App/modules/TrocItem/services/trocItemApi';
import {getRest} from '../models/client';
import {
  ClosestCategoryResult,
  ImageFeatures,
  LabelAnnotation,
  RequestBody,
  VisionApiResponse,
} from '../types/imageDetectionType';
import config from './config';
import {convertImageToBase64} from './imageHelper';
import * as stringSimilarity from 'string-similarity';
import analytics from '@react-native-firebase/analytics';

const generateBody = (imageBase64: string): RequestBody => {
  const features: ImageFeatures[] = [{type: 'LABEL_DETECTION', maxResults: 10}];

  const body: RequestBody = {
    requests: [
      {
        image: {
          content: imageBase64,
        },
        features: features,
      },
    ],
  };
  return body;
};

export const imageClassification = async (
  imageUri: string,
): Promise<ClosestCategoryResult | null> => {
  try {
    if (!imageUri) {
      throw new Error('Invalid image URI');
    }

    const apiUrl = `${config.GOOGLE_VISION_API_URL}/images:annotate?key=${config.GOOGLE_VISION_API_KEY}`;
    const imageBase64 = await convertImageToBase64(imageUri);

    if (!imageBase64) {
      throw new Error('Error converting image to base64');
    }

    const body = generateBody(imageBase64);
    const response = await getRest(apiUrl, body);

    if (response.ok) {
      const data: VisionApiResponse = await response.json();

      if (
        data.responses &&
        data.responses.length > 0 &&
        data.responses[0].labelAnnotations.length > 0
      ) {
        const closestResult = await findClosestResults(
          data.responses[0].labelAnnotations,
        );
        return closestResult;
      } else {
        throw new Error('No labels found in the response');
      }
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (err) {
    // Handle errors here
    console.error('Error:', err);
    throw err; // Rethrow the error for the caller to handle if necessary
  }
};

export const findClosestResults = async (
  labelAnnotations: LabelAnnotation[],
): Promise<ClosestCategoryResult | null> => {
  const {data} = await getCategoryItems();
  const {categoryItems} = data;

  const MIN_DETECTION_SCORE = 0.9;
  const MIN_DATA_SIMILARITY = 0.7;
  // Filter annotations with a score of ... or higher
  const filteredAnnotations = labelAnnotations.filter(
    annotation => annotation.score >= MIN_DETECTION_SCORE,
  );

  let bestMatch: ClosestCategoryResult | null = null;
  let highestSimilarity = 0;
  let annotationDescription = [];

  for (const annotation of filteredAnnotations) {
    annotationDescription.push(annotation.description);

    for (const item of categoryItems) {
      const similarity = stringSimilarity.compareTwoStrings(
        annotation.description.toLowerCase(),
        item.en.toLowerCase(),
      );

      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = {
          itemClosestName:
            getLocales()[0].languageCode === 'fr' ? item.fr : item.en,
          itemCategoryId: item.category._id,
        };
      }
    }
  }

  // Define a threshold for similarity (adjust as needed)
  const similarityThreshold = MIN_DATA_SIMILARITY;

  const notFoundResult: ClosestCategoryResult = {
    itemClosestName: annotationDescription.join(' / '),
    itemCategoryId: '',
  };

  if (highestSimilarity <= similarityThreshold) {
    await analytics().logEvent('imageDetection', {
      name: notFoundResult.itemClosestName,
    });
    return notFoundResult;
  }

  return bestMatch;
};
