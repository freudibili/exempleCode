import {useState, useEffect} from 'react';
import {imageDataType} from '../types/imageType';
import {imageClassification} from '../utils/imageDetectionHelper';

const useImageClassification = (imageData?: imageDataType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageCategoryId, setImageCategoryId] = useState<string | undefined>();
  const [imageLabel, setImageLabel] = useState<string | undefined>();

  useEffect(() => {
    if (!imageData) {
      // Handle the case when imageData is undefined here, if needed
      return;
    }
    const fetchImageDescription = async () => {
      if (imageData?.uri) {
        setIsLoading(true);
        try {
          const classification = await imageClassification(imageData.uri);

          setImageCategoryId(classification?.itemCategoryId);
          setImageLabel(classification?.itemClosestName);
        } catch (error) {
          console.error('Error classifying image:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchImageDescription();
  }, [imageData, imageData?.uri]);

  return {isLoading, imageCategoryId, imageLabel};
};

export default useImageClassification;
